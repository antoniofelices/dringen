import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { usePatientContext } from '@/hooks/usePatientContext'
import { PatientContext } from '@/context/patientContext'
import type { ReactNode } from 'react'

const createMockContextValue = (overrides = {}) => ({
    patientData: {
        id: '123',
        patient_name: 'Lorem',
        patient_last_name: 'Ipsum',
        patient_dni: '12345678',
        patient_phone: '123456789',
        patient_email: 'loremipsum@example.com',
        place_of_residence: 'Madrid',
        user_id: 'user123',
        medical_patient_history: null,
        medical_clinical_history: [],
    },
    patientHistory: null,
    clinicalHistory: [],
    patientLoading: false,
    patientError: false,
    patientErrorType: null,
    refetchPatient: vi.fn(),
    ...overrides,
})

const createWrapper = (contextValue: any) => {
    return ({ children }: { children: ReactNode }) => (
        <PatientContext.Provider value={contextValue}>
            {children}
        </PatientContext.Provider>
    )
}

describe('usePatientContext', () => {
    it('should return context value when used within PatientProvider', () => {
        const mockContextValue = createMockContextValue()

        const { result } = renderHook(() => usePatientContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current).toEqual(mockContextValue)
    })

    it('should throw error when used outside PatientProvider', () => {
        const consoleSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        expect(() => {
            renderHook(() => usePatientContext())
        }).toThrow('usePatient must be used within a PatientProvider')

        consoleSpy.mockRestore()
    })

    it('should return loading state correctly', () => {
        const mockContextValue = createMockContextValue({
            patientLoading: true,
            patientData: null,
        })

        const { result } = renderHook(() => usePatientContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.patientLoading).toBe(true)
        expect(result.current.patientData).toBe(null)
    })

    it('should return error state correctly', () => {
        const error = new Error('Failed to fetch patient')
        const mockContextValue = createMockContextValue({
            patientError: true,
            patientErrorType: error,
        })

        const { result } = renderHook(() => usePatientContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.patientError).toBe(true)
        expect(result.current.patientErrorType).toBe(error)
    })

    it('should provide refetch functionality', () => {
        const refetchMock = vi.fn()
        const mockContextValue = createMockContextValue({
            refetchPatient: refetchMock,
        })

        const { result } = renderHook(() => usePatientContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        result.current.refetchPatient()
        expect(refetchMock).toHaveBeenCalled()
    })

    it('should handle patient with clinical history', () => {
        const clinicalHistory = [
            {
                id: '1',
                patient_id: '123',
                type_of: 'nutricional',
                person_weight: 70,
                imc: 22.5,
                created_at: '2024-01-01',
            },
        ]

        const mockContextValue = createMockContextValue({
            clinicalHistory,
        })

        const { result } = renderHook(() => usePatientContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.clinicalHistory).toEqual(clinicalHistory)
    })

    it('should handle patient with medical history', () => {
        const patientHistory = {
            id: '1',
            patient_id: '123',
            allergies: 'None',
            medications: 'Aspirin',
            medical_conditions: 'Hypertension',
        }

        const mockContextValue = createMockContextValue({
            patientHistory,
        })

        const { result } = renderHook(() => usePatientContext(), {
            wrapper: createWrapper(mockContextValue),
        })

        expect(result.current.patientHistory).toEqual(patientHistory)
    })
})
