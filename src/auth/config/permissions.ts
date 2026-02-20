import type { UserRoleType } from '@auth/types/auth.model'

export const permissions = {
    ROUTES: {
        DASHBOARD_PANEL: ['doctor', 'receptionist'] as UserRoleType[],
        PATIENT_MANAGEMENT: ['doctor', 'receptionist'] as UserRoleType[],
        APPOINTMENTS: ['doctor', 'receptionist'] as UserRoleType[],
        CLINICAL_HISTORY: ['doctor'] as UserRoleType[],
        DIAGNOSIS: ['doctor'] as UserRoleType[],
        REPORTS: ['doctor'] as UserRoleType[],
        USER_MANAGEMENT: ['doctor'] as UserRoleType[],
    },
    ACTIONS: {
        CREATE_APPOINTMENT: ['doctor', 'receptionist'] as UserRoleType[],
        CANCEL_APPOINTMENT: ['doctor', 'receptionist'] as UserRoleType[],
        CREATE_DIAGNOSIS: ['doctor'] as UserRoleType[],
        EDIT_PATIENT: ['doctor', 'receptionist'] as UserRoleType[],
        DELETE_PATIENT: ['doctor'] as UserRoleType[],
        VIEW_ALL_PATIENTS: ['doctor', 'receptionist'] as UserRoleType[],
        VIEW_ASSIGNED_PATIENTS: ['doctor'] as UserRoleType[],
        EDIT_CLINICAL_HISTORY: ['doctor'] as UserRoleType[],
        VIEW_REPORTS: ['doctor'] as UserRoleType[],
    },
} as const
