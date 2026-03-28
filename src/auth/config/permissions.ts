import type { UserRoleType } from '@auth/types/auth.model'

export const permissions = {
    ROUTES: {
        DASHBOARD_PANEL: ['doctor', 'administrative', 'administrative_hr'],
        PATIENT_MANAGEMENT: ['doctor', 'administrative', 'administrative_hr'],
        APPOINTMENTS: ['doctor', 'administrative', 'administrative_hr'],
        CLINICAL_HISTORY: ['doctor'],
        DIAGNOSIS: ['doctor'],
        REPORTS: ['doctor'],
        USER_MANAGEMENT: ['administrative_hr'],
        ORGANIZATION: ['administrative_hr'],
    },
    ACTIONS: {
        CREATE_APPOINTMENT: ['doctor', 'administrative', 'administrative_hr'],
        CANCEL_APPOINTMENT: ['doctor', 'administrative', 'administrative_hr'],

        CREATE_PATIENT: ['doctor', 'administrative', 'administrative_hr'],
        EDIT_PATIENT: ['doctor', 'administrative', 'administrative_hr'],
        DELETE_PATIENT: ['doctor'],
        VIEW_ALL_PATIENTS: ['doctor', 'administrative', 'administrative_hr'],
        VIEW_ASSIGNED_PATIENTS: ['doctor'],

        CREATE_DIAGNOSIS: ['doctor'],
        EDIT_CLINICAL_HISTORY: ['doctor'],
        VIEW_REPORTS: ['doctor'],
        CREATE_OBSERVATION: ['doctor'],
        CREATE_ENCOUNTER: ['doctor'],
        CREATE_SERVICE_REQUEST: ['doctor'],
        CREATE_MEDICATION_REQUEST: ['doctor'],
        CREATE_ALLERGY: ['doctor'],
        CREATE_FAMILY_MEMBER_HISTORY: ['doctor'],

        CREATE_PRACTITIONER: ['administrative_hr'],
        SOFT_DELETE_PRACTITIONER: ['administrative_hr'],

        MANAGE_SCHEDULES: ['administrative_hr'],

        MANAGE_ORGANIZATION: ['administrative_hr'],
        MANAGE_LOCATION: ['administrative_hr'],
        VIEW_ORGANIZATION: ['doctor', 'administrative', 'administrative_hr'],
        VIEW_LOCATION: ['doctor', 'administrative', 'administrative_hr'],
    },
} satisfies Record<string, Record<string, UserRoleType[]>>
