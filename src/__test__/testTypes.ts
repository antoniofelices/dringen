import type { Tables } from '@/types/database.types'
import { vi } from 'vitest'

// Mock user type based on actual database schema
export const createMockUser = (overrides: Partial<Tables<'medical_user'>> = {}): Tables<'medical_user'> => ({
    id: '123',
    email: 'test@example.com',
    user_name: 'Lorem',
    user_last_name: 'Ipsum',
    dni: '12345678A',
    role: 'admin',
    is_active: true,
    avatar_url: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides,
})

// Mock patient type based on actual database schema
export const createMockPatient = (overrides: Partial<Tables<'medical_patient'>> = {}): Tables<'medical_patient'> => ({
    id: '1',
    user_name: 'Lorem',
    user_last_name: 'Ipsum',
    dni: '12345678A',
    phone: '123456789',
    email: 'lorem@example.com',
    place_of_residence: 'Madrid',
    birthday: '1990-01-01',
    birthplace: 'Madrid',
    gender: 'M',
    occupation: 'Engineer',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides,
})

// Mock clinical history type based on actual database schema
export const createMockClinicalHistory = (overrides: Partial<Tables<'medical_clinical_history'>> = {}): Tables<'medical_clinical_history'> => ({
    id: '1',
    patient_id: '123',
    type_of: 'nutricional',
    person_weight: 70,
    imc: 22.5,
    created_at: '2024-01-01T00:00:00Z',
    additional_tests: null,
    bfp: null,
    eating: null,
    examination: null,
    fc: null,
    feces: null,
    fr: null,
    gfp: null,
    mmp: null,
    mood: null,
    oximetry: null,
    pad: null,
    pas: null,
    person_height: null,
    sleep: null,
    temperature: null,
    test: null,
    thirst: null,
    treatment: null,
    updated_at: null,
    urine: null,
    waist: null,
    ...overrides,
})

// Mock Supabase Auth User type
export const createMockAuthUser = (overrides: any = {}) => ({
    id: '123',
    email: 'test@example.com',
    aud: 'authenticated',
    app_metadata: {},
    user_metadata: {},
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    phone: null,
    email_confirmed_at: '2024-01-01T00:00:00Z',
    confirmed_at: '2024-01-01T00:00:00Z',
    last_sign_in_at: '2024-01-01T00:00:00Z',
    role: 'authenticated',
    ...overrides,
})

// Mock Supabase Subscription type
export const createMockSubscription = () => ({
    id: 'sub-123',
    callback: vi.fn(),
    unsubscribe: vi.fn(),
})

// Mock hook return types
export const createMockUseAuthReturn = (overrides: any = {}) => ({
    user: null,
    loading: false,
    isLoggedIn: false,
    ...overrides,
})

export const createMockUseCurrentUserReturn = (overrides: any = {}) => ({
    user: undefined,
    authUser: null,
    isPending: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
    isAuthenticated: false,
    ...overrides,
})

export const createMockUsePatientsReturn = (overrides: any = {}) => ({
    patients: undefined,
    isPending: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
    ...overrides,
})

export const createMockUseClinicalHistoryReturn = (overrides: any = {}) => ({
    clinicalHistory: undefined,
    isPending: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
    ...overrides,
})

export const createMockUsePatientContextReturn = (overrides: any = {}) => ({
    patientData: null,
    patientHistory: null,
    clinicalHistory: null,
    patientLoading: false,
    patientError: false,
    patientErrorType: null,
    refetch: vi.fn(),
    ...overrides,
})