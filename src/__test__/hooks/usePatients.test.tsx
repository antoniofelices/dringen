import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePatients } from '@/hooks/usePatients'
import type { ReactNode } from 'react'
import { createMockPatient } from '../testTypes'

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
        createMockPatient({
            id: '1',
            user_name: 'Lorem',
            user_last_name: 'Ipsum',
            dni: '12345678A',
            phone: '123456789',
            email: 'lorem@example.com',
            place_of_residence: 'Madrid',
        }),
        createMockPatient({
            id: '2',
            user_name: 'Calar',
            user_last_name: 'Dolor',
            dni: '87654321B',
            phone: '987654321',
            email: 'calar@example.com',
            place_of_residence: 'Barcelona',
        }),
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
