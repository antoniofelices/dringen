import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useIsMobile } from '@/hooks/useMobile'

const mockMatchMedia = vi.fn()

describe('useIsMobile', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: mockMatchMedia,
        })

        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            value: 1024,
        })

        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should return false for desktop width (>= 768px)', () => {
        const mockMql = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)
        Object.defineProperty(window, 'innerWidth', {
            value: 1024,
        })

        const { result } = renderHook(() => useIsMobile())

        expect(result.current).toBe(false)
        expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
    })

    it('should return true for mobile width (< 768px)', () => {
        const mockMql = {
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)
        Object.defineProperty(window, 'innerWidth', {
            value: 600,
        })

        const { result } = renderHook(() => useIsMobile())

        expect(result.current).toBe(true)
    })

    it('should return true exactly at mobile breakpoint (767px)', () => {
        const mockMql = {
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)
        Object.defineProperty(window, 'innerWidth', {
            value: 767,
        })

        const { result } = renderHook(() => useIsMobile())

        expect(result.current).toBe(true)
    })

    it('should return false exactly at desktop breakpoint (768px)', () => {
        const mockMql = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)
        Object.defineProperty(window, 'innerWidth', {
            value: 768,
        })

        const { result } = renderHook(() => useIsMobile())

        expect(result.current).toBe(false)
    })

    it('should listen for media query changes', () => {
        const mockMql = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)

        renderHook(() => useIsMobile())

        expect(mockMql.addEventListener).toHaveBeenCalledWith(
            'change',
            expect.any(Function)
        )
    })

    it('should respond to media query changes', () => {
        let changeHandler: (() => void) | null = null
        const mockMql = {
            matches: false,
            addEventListener: vi.fn((event, handler) => {
                if (event === 'change') {
                    changeHandler = handler
                }
            }),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)
        Object.defineProperty(window, 'innerWidth', {
            value: 1024,
            writable: true,
        })

        const { result } = renderHook(() => useIsMobile())

        expect(result.current).toBe(false)

        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                value: 600,
                writable: true,
            })
            if (changeHandler) {
                changeHandler()
            }
        })

        expect(result.current).toBe(true)

        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                value: 1024,
                writable: true,
            })
            if (changeHandler) {
                changeHandler()
            }
        })

        expect(result.current).toBe(false)
    })

    it('should remove event listener on unmount', () => {
        const mockMql = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)

        const { unmount } = renderHook(() => useIsMobile())

        expect(mockMql.removeEventListener).not.toHaveBeenCalled()

        unmount()

        expect(mockMql.removeEventListener).toHaveBeenCalledWith(
            'change',
            expect.any(Function)
        )
    })

    it('should initialize with undefined and then set correct value', () => {
        const mockMql = {
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        mockMatchMedia.mockReturnValue(mockMql)
        Object.defineProperty(window, 'innerWidth', {
            value: 1024,
        })

        const { result } = renderHook(() => useIsMobile())

        expect(result.current).toBe(false)
    })

    it('should handle edge case where matchMedia is not supported', () => {
        Object.defineProperty(window, 'matchMedia', {
            value: undefined,
        })

        expect(() => {
            renderHook(() => useIsMobile())
        }).toThrow()
    })
})
