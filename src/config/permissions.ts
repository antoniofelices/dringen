import type { UserRoleType } from '@auth/types/auth.model'

export const PERMISSIONS = {
    ROUTES: {
        DASHBOARD_PANEL: ['admin'] as UserRoleType[],
        PATIENT_MANAGEMENT: [
            'admin',
            'medical_office',
            'physician',
        ] as UserRoleType[],
        APPOINTMENTS: [
            'admin',
            'medical_office',
            'physician',
        ] as UserRoleType[],
        CLINICAL_HISTORY: ['admin', 'physician'] as UserRoleType[],
        DIAGNOSIS: ['admin', 'physician'] as UserRoleType[],
        REPORTS: ['admin', 'physician'] as UserRoleType[],
        USER_MANAGEMENT: ['admin'] as UserRoleType[],
    },
    ACTIONS: {
        CREATE_APPOINTMENT: [
            'admin',
            'medical_office',
            'physician',
        ] as UserRoleType[],
        CANCEL_APPOINTMENT: [
            'admin',
            'medical_office',
            'physician',
        ] as UserRoleType[],
        CREATE_DIAGNOSIS: ['admin', 'physician'] as UserRoleType[],
        EDIT_PATIENT: [
            'admin',
            'medical_office',
            'physician',
        ] as UserRoleType[],
        DELETE_PATIENT: ['admin'] as UserRoleType[],
        VIEW_ALL_PATIENTS: [
            'admin',
            'medical_office',
            'physician',
        ] as UserRoleType[],
        VIEW_ASSIGNED_PATIENTS: ['admin', 'physician'] as UserRoleType[],
        EDIT_CLINICAL_HISTORY: ['admin', 'physician'] as UserRoleType[],
        VIEW_REPORTS: ['admin', 'physician'] as UserRoleType[],
    },
} as const
