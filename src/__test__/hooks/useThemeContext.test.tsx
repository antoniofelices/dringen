import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useThemeContext } from '@/hooks/useThemeContext'
import { ThemeContext } from '@/context/themeContext'
import type { Theme } from '@/context/themeContext'
import type { ReactNode } from 'react'

const createMockContextValue = (theme: Theme = 'system') => ({
    theme,
    setTheme: vi.fn(),
})

const createWrapper = (contextValue: any) => {
    return ({ children }: { children: ReactNode }) => (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

describe('useThemeContext', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return context value when used within ThemeProvider', () => {
        const mockContextValue = createMockContextValue('dark')

        const { result } = renderHook(() => useThemeContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.theme).toBe('dark')
        expect(typeof result.current.setTheme).toBe('function')
    })

    it('should return default context when used outside ThemeProvider', () => {
        const { result } = renderHook(() => useThemeContext(), {
            wrapper: ({ children }) => <>{children}</>, // No ThemeProvider
        })

        expect(result.current.theme).toBe('system')
        expect(typeof result.current.setTheme).toBe('function')
    })

    it('should handle light theme', () => {
        const mockContextValue = createMockContextValue('light')

        const { result } = renderHook(() => useThemeContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.theme).toBe('light')
    })

    it('should handle dark theme', () => {
        const mockContextValue = createMockContextValue('dark')

        const { result } = renderHook(() => useThemeContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.theme).toBe('dark')
    })

    it('should handle system theme', () => {
        const mockContextValue = createMockContextValue('system')

        const { result } = renderHook(() => useThemeContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.theme).toBe('system')
    })

    it('should call setTheme when theme is changed', () => {
        const setThemeMock = vi.fn()
        const mockContextValue = {
            theme: 'light' as Theme,
            setTheme: setThemeMock,
        }

        const { result } = renderHook(() => useThemeContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        result.current.setTheme('dark')
        expect(setThemeMock).toHaveBeenCalledWith('dark')
    })

    it('should return the same setTheme function reference', () => {
        const setThemeMock = vi.fn()
        const mockContextValue = {
            theme: 'light' as Theme,
            setTheme: setThemeMock,
        }

        const { result, rerender } = renderHook(() => useThemeContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        const initialSetTheme = result.current.setTheme
        rerender()
        expect(result.current.setTheme).toBe(initialSetTheme)
    })
})
