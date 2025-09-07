import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePatients } from '@/hooks/usePatients'
import type { ReactNode } from 'react'

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

describe('usePatients', () => {
    const mockPatientsData = [
        {
            id: '1',
            patient_name: 'Lorem',
            patient_last_name: 'Ipsum',
            patient_dni: '12345678A',
            patient_phone: '123456789',
            patient_email: 'loremipsum@example.com',
            place_of_residence: 'Madrid',
            user_id: 'user1',
            created_at: '2024-01-01',
        },
        {
            id: '2',
            patient_name: 'Calar',
            patient_last_name: 'Dolor',
            patient_dni: '87654321B',
            patient_phone: '987654321',
            patient_email: 'calardolor@example.com',
            place_of_residence: 'Barcelona',
            user_id: 'user2',
            created_at: '2024-01-02',
        },
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should fetch patients successfully', async () => {
        const { getListPatients } = await import('@services/supabaseService')
        vi.mocked(getListPatients).mockResolvedValue(mockPatientsData)

        const { result } = renderHook(() => usePatients(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isPending).toBe(true)

        await waitFor(() => {
            expect(result.current.isPending).toBe(false)
        })

        expect(result.current.patients).toEqual(mockPatientsData)
        expect(result.current.isError).toBe(false)
        expect(getListPatients).toHaveBeenCalledTimes(1)
    })

    it('should handle fetch errors', async () => {
        const { getListPatients } = await import('@services/supabaseService')
        const error = new Error('Failed to fetch patients')
        vi.mocked(getListPatients).mockRejectedValue(error)

        const { result } = renderHook(() => usePatients(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isPending).toBe(true)

        await waitFor(() => {
            expect(result.current.isPending).toBe(false)
        })

        expect(result.current.patients).toBeUndefined()
        expect(result.current.isError).toBe(true)
        expect(result.current.error).toEqual(error)
    })

    it('should handle empty patients list', async () => {
        const { getListPatients } = await import('@services/supabaseService')
        vi.mocked(getListPatients).mockResolvedValue([])

        const { result } = renderHook(() => usePatients(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.isPending).toBe(false)
        })

        expect(result.current.patients).toEqual([])
        expect(result.current.isError).toBe(false)
    })
})
