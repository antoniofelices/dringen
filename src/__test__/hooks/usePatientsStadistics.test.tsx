import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
    useDataTotalPatients,
    useDataResidence,
    useDataTypeOf,
} from '@/hooks/usePatientsStadistics'
import { createMockPatient, createMockClinicalHistory, createMockUsePatientsReturn, createMockUseClinicalHistoryReturn } from '../testTypes'

vi.mock('@/hooks/usePatients')
vi.mock('@/hooks/useClinicalHistory')

describe('usePatientsStadistics', () => {
    const mockPatientsData = [
        createMockPatient({
            id: '1',
            user_name: 'Lorem',
            user_last_name: 'Ipsum',
            place_of_residence: 'Madrid',
        }),
        createMockPatient({
            id: '2',
            user_name: 'Calar',
            user_last_name: 'Dolor',
            place_of_residence: 'Barcelona',
        }),
        createMockPatient({
            id: '3',
            user_name: 'Mauris',
            user_last_name: 'Sed',
            place_of_residence: 'Madrid',
        }),
    ]

    const mockClinicalHistoryData = [
        createMockClinicalHistory({
            id: '1',
            patient_id: '1',
            type_of: 'nutricional',
        }),
        createMockClinicalHistory({
            id: '2',
            patient_id: '2',
            type_of: 'general',
        }),
        createMockClinicalHistory({
            id: '3',
            patient_id: '3',
            type_of: 'nutricional',
        }),
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('useDataTotalPatients', () => {
        it('should return correct total number of patients', async () => {
            const { usePatients } = await import('@/hooks/usePatients')
            vi.mocked(usePatients).mockReturnValue(createMockUsePatientsReturn({
                patients: mockPatientsData,
            }))

            const { result } = renderHook(() => useDataTotalPatients())

            expect(result.current).toBe(3)
        })

        it('should return undefined when no patients data', async () => {
            const { usePatients } = await import('@/hooks/usePatients')
            vi.mocked(usePatients).mockReturnValue(createMockUsePatientsReturn({
                patients: undefined,
            }))

            const { result } = renderHook(() => useDataTotalPatients())

            expect(result.current).toBeUndefined()
        })
    })

    describe('useDataResidence', () => {
        it('should return residence statistics correctly', async () => {
            const { usePatients } = await import('@/hooks/usePatients')
            vi.mocked(usePatients).mockReturnValue(createMockUsePatientsReturn({
                patients: mockPatientsData,
            }))

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
            vi.mocked(usePatients).mockReturnValue(createMockUsePatientsReturn({
                patients: [],
            }))

            const { result } = renderHook(() => useDataResidence())

            expect(result.current).toEqual([])
        })
    })

    describe('useDataTypeOf', () => {
        it('should return consultation type statistics correctly', async () => {
            const { useClinicalHistory } = await import('@/hooks/useClinicalHistory')
            vi.mocked(useClinicalHistory).mockReturnValue(createMockUseClinicalHistoryReturn({
                clinicalHistory: mockClinicalHistoryData,
            }))

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
            const { useClinicalHistory } = await import('@/hooks/useClinicalHistory')
            vi.mocked(useClinicalHistory).mockReturnValue(createMockUseClinicalHistoryReturn({
                clinicalHistory: [],
            }))

            const { result } = renderHook(() => useDataTypeOf())

            expect(result.current).toEqual([])
        })
    })
})