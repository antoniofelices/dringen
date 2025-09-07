import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useDataWeight, useDataBMI } from '@/hooks/usePatientMetrics'

vi.mock('@/hooks/usePatientContext')

describe('usePatientMetrics', () => {
    const mockClinicalHistory = [
        {
            id: '1',
            patient_id: '123',
            type_of: 'nutricional',
            person_weight: 70,
            imc: 22.5,
            created_at: '2024-01-01T10:00:00Z',
        },
        {
            id: '2',
            patient_id: '123',
            type_of: 'nutricional',
            person_weight: 72,
            imc: 23.1,
            created_at: '2024-02-01T10:00:00Z',
        },
        {
            id: '3',
            patient_id: '123',
            type_of: 'general',
            person_weight: 71,
            imc: 22.8,
            created_at: '2024-01-15T10:00:00Z',
        },
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('useDataWeight', () => {
        it('should return weight data for nutritional consultations only', async () => {
            const { usePatientContext } = await import(
                '@/hooks/usePatientContext'
            )
            vi.mocked(usePatientContext).mockReturnValue({
                clinicalHistory: mockClinicalHistory,
            })

            const { result } = renderHook(() => useDataWeight())

            expect(result.current).toEqual([
                {
                    date: '2024-01-01T10:00:00Z',
                    weight: 70,
                },
                {
                    date: '2024-02-01T10:00:00Z',
                    weight: 72,
                },
            ])
        })

        it('should return empty array when no clinical history', async () => {
            const { usePatientContext } = await import(
                '@/hooks/usePatientContext'
            )
            vi.mocked(usePatientContext).mockReturnValue({
                clinicalHistory: null,
            })

            const { result } = renderHook(() => useDataWeight())

            expect(result.current).toEqual([])
        })
    })

    describe('useDataBMI', () => {
        it('should return BMI data for nutritional consultations only', async () => {
            const { usePatientContext } = await import(
                '@/hooks/usePatientContext'
            )
            vi.mocked(usePatientContext).mockReturnValue({
                clinicalHistory: mockClinicalHistory,
            })

            const { result } = renderHook(() => useDataBMI())

            expect(result.current).toEqual([
                {
                    date: '2024-01-01T10:00:00Z',
                    bmi: 22.5,
                },
                {
                    date: '2024-02-01T10:00:00Z',
                    bmi: 23.1,
                },
            ])
        })

        it('should return empty array when no clinical history', async () => {
            const { usePatientContext } = await import(
                '@/hooks/usePatientContext'
            )
            vi.mocked(usePatientContext).mockReturnValue({
                clinicalHistory: null,
            })

            const { result } = renderHook(() => useDataBMI())

            expect(result.current).toEqual([])
        })
    })
})
