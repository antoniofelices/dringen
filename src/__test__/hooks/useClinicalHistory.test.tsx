import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useClinicalHistory } from '@/hooks/useClinicalHistory'
import type { ReactNode } from 'react'
import { createMockClinicalHistory } from '../testTypes'

vi.mock('@services/supabaseService')

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('useClinicalHistory', () => {
    const mockClinicalHistoryData = [
        createMockClinicalHistory({
            id: '1',
            patient_id: '123',
            type_of: 'nutricional',
            person_weight: 70,
            imc: 22.5,
        }),
        createMockClinicalHistory({
            id: '2',
            patient_id: '456',
            type_of: 'general',
            person_weight: null,
            imc: null,
        }),
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should fetch clinical history successfully', async () => {
        const { getListAllClinicalHistory } = await import(
            '@services/supabaseService'
        )
        vi.mocked(getListAllClinicalHistory).mockResolvedValue(
            mockClinicalHistoryData
        )

        const { result } = renderHook(() => useClinicalHistory(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isPending).toBe(true)

        await waitFor(() => {
            expect(result.current.isPending).toBe(false)
        })

        expect(result.current.clinicalHistory).toEqual(mockClinicalHistoryData)
        expect(result.current.isError).toBe(false)
        expect(getListAllClinicalHistory).toHaveBeenCalledTimes(1)
    })

    it('should handle fetch errors', async () => {
        const { getListAllClinicalHistory } = await import(
            '@services/supabaseService'
        )
        const error = new Error('Failed to fetch clinical history')
        vi.mocked(getListAllClinicalHistory).mockRejectedValue(error)

        const { result } = renderHook(() => useClinicalHistory(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isPending).toBe(true)

        await waitFor(() => {
            expect(result.current.isPending).toBe(false)
        })

        expect(result.current.clinicalHistory).toBeUndefined()
        expect(result.current.isError).toBe(true)
        expect(result.current.error).toEqual(error)
    })

    it('should handle empty clinical history', async () => {
        const { getListAllClinicalHistory } = await import(
            '@services/supabaseService'
        )
        vi.mocked(getListAllClinicalHistory).mockResolvedValue([])

        const { result } = renderHook(() => useClinicalHistory(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.isPending).toBe(false)
        })

        expect(result.current.clinicalHistory).toEqual([])
        expect(result.current.isError).toBe(false)
    })
})
