import type { UserRoleType } from '@auth/types/auth.model'

export const permissions = {
    ROUTES: {
        DASHBOARD_PANEL: ['doctor', 'administrative'],
        PATIENT_MANAGEMENT: ['doctor', 'administrative'],
        APPOINTMENTS: ['doctor', 'administrative'],
        CLINICAL_HISTORY: ['doctor'],
        DIAGNOSIS: ['doctor'],
        REPORTS: ['doctor'],
        USER_MANAGEMENT: ['doctor'],
    },
    ACTIONS: {
        CREATE_APPOINTMENT: ['doctor', 'administrative'],
        CANCEL_APPOINTMENT: ['doctor', 'administrative'],
        CREATE_DIAGNOSIS: ['doctor'],
        EDIT_PATIENT: ['doctor', 'administrative'],
        DELETE_PATIENT: ['doctor'],
        VIEW_ALL_PATIENTS: ['doctor', 'administrative'],
        VIEW_ASSIGNED_PATIENTS: ['doctor'],
        EDIT_CLINICAL_HISTORY: ['doctor'],
        VIEW_REPORTS: ['doctor'],
    },
} satisfies Record<string, Record<string, UserRoleType[]>>
