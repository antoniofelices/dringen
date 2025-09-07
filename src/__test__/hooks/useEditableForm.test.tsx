import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useEditableForm } from '@/hooks/useEditableForm'

type TestData = {
    name: string
    email: string
}

describe('useEditableForm', () => {
    const mockOnRefetch = vi.fn()

    const completenessCheck = (data: TestData): boolean => {
        return Boolean(data.name && data.email)
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('when data is complete', () => {
        const completeData: TestData = {
            name: 'Lorem Ipsum',
            email: 'lorem@example.com',
        }

        it('should initialize with editing disabled for complete data', () => {
            const { result } = renderHook(() =>
                useEditableForm(completeData, completenessCheck, mockOnRefetch)
            )

            expect(result.current.isEditing).toBe(false)
            expect(result.current.isDataComplete).toBe(true)
        })

        it('should toggle editing state', () => {
            const { result } = renderHook(() =>
                useEditableForm(completeData, completenessCheck, mockOnRefetch)
            )

            expect(result.current.isEditing).toBe(false)

            act(() => {
                result.current.handleToggle()
            })

            expect(result.current.isEditing).toBe(true)

            act(() => {
                result.current.handleToggle()
            })

            expect(result.current.isEditing).toBe(false)
        })
    })

    describe('when data is incomplete', () => {
        const incompleteData: TestData = {
            name: 'Lorem Ipsum',
            email: '',
        }

        it('should initialize with editing enabled for incomplete data', () => {
            const { result } = renderHook(() =>
                useEditableForm(
                    incompleteData,
                    completenessCheck,
                    mockOnRefetch
                )
            )

            expect(result.current.isEditing).toBe(true)
            expect(result.current.isDataComplete).toBe(false)
        })
    })

    describe('when data is null', () => {
        it('should initialize with editing enabled for null data', () => {
            const { result } = renderHook(() =>
                useEditableForm(null, completenessCheck, mockOnRefetch)
            )

            expect(result.current.isEditing).toBe(true)
            expect(result.current.isDataComplete).toBe(false)
        })
    })

    describe('handleFormSuccess', () => {
        it('should call onRefetch and disable editing on form success', () => {
            const completeData: TestData = {
                name: 'Lorem Ipsum',
                email: 'lorem@example.com',
            }

            const { result } = renderHook(() =>
                useEditableForm(completeData, completenessCheck, mockOnRefetch)
            )

            act(() => {
                result.current.handleToggle()
            })

            expect(result.current.isEditing).toBe(true)

            act(() => {
                result.current.handleFormSuccess()
            })

            expect(mockOnRefetch).toHaveBeenCalled()
            expect(result.current.isEditing).toBe(false)
        })

        it('should call onRefetch even when editing was already disabled', () => {
            const completeData: TestData = {
                name: 'Lorem Ipsum',
                email: 'lorem@example.com',
            }

            const { result } = renderHook(() =>
                useEditableForm(completeData, completenessCheck, mockOnRefetch)
            )

            expect(result.current.isEditing).toBe(false)

            act(() => {
                result.current.handleFormSuccess()
            })

            expect(mockOnRefetch).toHaveBeenCalled()
            expect(result.current.isEditing).toBe(false)
        })
    })

    describe('completeness check updates', () => {
        it('should update isDataComplete when completeness check changes result', () => {
            const incompleteData: TestData = {
                name: 'Lorem Ipsum',
                email: '',
            }

            const { result, rerender } = renderHook(
                ({ data }) =>
                    useEditableForm(data, completenessCheck, mockOnRefetch),
                {
                    initialProps: { data: incompleteData },
                }
            )

            expect(result.current.isDataComplete).toBe(false)
            expect(result.current.isEditing).toBe(true)

            const completeData: TestData = {
                name: 'Lorem Ipsum',
                email: 'lorem@example.com',
            }

            rerender({ data: completeData })

            expect(result.current.isDataComplete).toBe(true)
        })
    })

    describe('callback stability', () => {
        it('should maintain stable callback references', () => {
            const completeData: TestData = {
                name: 'Lorem Ipsum',
                email: 'lorem@example.com',
            }

            const { result, rerender } = renderHook(() =>
                useEditableForm(completeData, completenessCheck, mockOnRefetch)
            )

            const initialHandleToggle = result.current.handleToggle
            const initialHandleFormSuccess = result.current.handleFormSuccess

            rerender()

            expect(result.current.handleToggle).toBe(initialHandleToggle)
            expect(result.current.handleFormSuccess).toBe(
                initialHandleFormSuccess
            )
        })

        it('should update handleFormSuccess when onRefetch changes', () => {
            const completeData: TestData = {
                name: 'Lorem Ipsum',
                email: 'lorem@example.com',
            }

            const newMockOnRefetch = vi.fn()

            const { result, rerender } = renderHook(
                ({ onRefetch }) =>
                    useEditableForm(completeData, completenessCheck, onRefetch),
                {
                    initialProps: { onRefetch: mockOnRefetch },
                }
            )

            const initialHandleFormSuccess = result.current.handleFormSuccess

            rerender({ onRefetch: newMockOnRefetch })

            expect(result.current.handleFormSuccess).not.toBe(
                initialHandleFormSuccess
            )

            act(() => {
                result.current.handleFormSuccess()
            })

            expect(newMockOnRefetch).toHaveBeenCalled()
            expect(mockOnRefetch).not.toHaveBeenCalled()
        })
    })
})
