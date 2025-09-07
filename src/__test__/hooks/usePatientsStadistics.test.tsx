import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    useDataTotalPatients,
    useDataResidence,
    useDataTypeOf,
} from '@/hooks/usePatientsStadistics'

vi.mock('@/hooks/usePatients')
vi.mock('@/hooks/useClinicalHistory')

describe('usePatientsStadistics', () => {
    const mockPatientsData = [
        {
            id: '1',
            patient_name: 'Lorem',
            patient_last_name: 'Ipsum',
            place_of_residence: 'Madrid',
        },
        {
            id: '2',
            patient_name: 'Calar',
            patient_last_name: 'Dolor',
            place_of_residence: 'Barcelona',
        },
        {
            id: '3',
            patient_name: 'Mauris',
            patient_last_name: 'Sed',
            place_of_residence: 'Madrid',
        },
    ]

    const mockClinicalHistoryData = [
        {
            id: '1',
            patient_id: '1',
            type_of: 'nutricional',
        },
        {
            id: '2',
            patient_id: '2',
            type_of: 'general',
        },
        {
            id: '3',
            patient_id: '3',
            type_of: 'nutricional',
        },
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('useDataTotalPatients', () => {
        it('should return correct total number of patients', async () => {
            const { usePatients } = await import('@/hooks/usePatients')
            vi.mocked(usePatients).mockReturnValue({
                patients: mockPatientsData,
            })

            const { result } = renderHook(() => useDataTotalPatients())

            expect(result.current).toBe(3)
        })

        it('should return undefined when no patients data', async () => {
            const { usePatients } = await import('@/hooks/usePatients')
            vi.mocked(usePatients).mockReturnValue({
                patients: null,
            })

            const { result } = renderHook(() => useDataTotalPatients())

            expect(result.current).toBeUndefined()
        })
    })

    describe('useDataResidence', () => {
        it('should return residence statistics correctly', async () => {
            const { usePatients } = await import('@/hooks/usePatients')
            vi.mocked(usePatients).mockReturnValue({
                patients: mockPatientsData,
            })

            const { result } = renderHook(() => useDataResidence())

            expect(result.current).toEqual([
                {
                    residence: 'Madrid',
                    quantity: 2,
                },
                {
                    residence: 'Barcelona',
                    quantity: 1,
                },
            ])
        })

        it('should handle empty patients array', async () => {
            const { usePatients } = await import('@/hooks/usePatients')
            vi.mocked(usePatients).mockReturnValue({
                patients: [],
            })

            const { result } = renderHook(() => useDataResidence())

            expect(result.current).toEqual([])
        })
    })

    describe('useDataTypeOf', () => {
        it('should return consultation type statistics correctly', async () => {
            const { useClinicalHistory } = await import(
                '@/hooks/useClinicalHistory'
            )
            vi.mocked(useClinicalHistory).mockReturnValue({
                clinicalHistory: mockClinicalHistoryData,
            })

            const { result } = renderHook(() => useDataTypeOf())

            expect(result.current).toEqual([
                {
                    type: 'nutricional',
                    quantity: 2,
                },
                {
                    type: 'general',
                    quantity: 1,
                },
            ])
        })

        it('should handle empty clinical history array', async () => {
            const { useClinicalHistory } = await import(
                '@/hooks/useClinicalHistory'
            )
            vi.mocked(useClinicalHistory).mockReturnValue({
                clinicalHistory: [],
            })

            const { result } = renderHook(() => useDataTypeOf())

            expect(result.current).toEqual([])
        })
    })
})
