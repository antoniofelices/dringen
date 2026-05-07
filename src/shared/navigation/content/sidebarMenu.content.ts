import type { NavigationGroup } from '@shared/navigation/types/navigation.model'
import {
    ClipboardPlus,
    Users,
    PlusCircle,
    PlusCircleIcon,
    CalendarDays,
    Info,
    Building,
} from 'lucide-react'
import { MEDPLUM_CONFIG } from '@shared/fhir/config'

export const sidebarMenu = (practitionerId: string): NavigationGroup[] => [
    {
        id: 'physician',
        title: 'Menu Physician',
        allowedRoles: ['doctor'],
        items: [
            {
                id: 1,
                icon: ClipboardPlus,
                url: `/practitioner/${practitionerId}/schedule`,
                text: 'My Schedule',
                orderMenu: 1,
            },
            {
                id: 2,
                icon: Users,
                url: `/practitioner/${practitionerId}/patient-list`,
                text: 'My Patients',
                orderMenu: 2,
            },
            {
                id: 3,
                icon: PlusCircle,
                url: '/patient/add',
                text: 'Add Patient',
                orderMenu: 3,
            },
        ],
    },
    {
        id: 'administrative',
        title: 'Menu Administratives',
        allowedRoles: ['administrative', 'administrative_hr'],
        items: [
            {
                id: 1,
                icon: ClipboardPlus,
                url: '/patient/patient-list',
                text: 'Patients List',
                orderMenu: 1,
            },
            {
                id: 2,
                icon: PlusCircleIcon,
                url: '/patient/add',
                text: 'Add Patient',
                orderMenu: 2,
            },
            {
                id: 3,
                icon: CalendarDays,
                url: '/appointment/appointment-list',
                text: 'Appointments',
                orderMenu: 3,
            },
            {
                id: 4,
                icon: PlusCircleIcon,
                url: '/appointment/add',
                text: 'Add Appointment',
                orderMenu: 4,
            },
            {
                id: 5,
                icon: Users,
                url: '/practitioner/physician-list',
                text: 'Physicians List',
                orderMenu: 5,
            },
        ],
    },
    {
        id: 'organization',
        title: 'Menu Organization',
        items: [
            {
                id: 1,
                icon: Building,
                url: `/organization/${MEDPLUM_CONFIG.organizationId}`,
                text: 'Organization',
                orderMenu: 1,
            },
            {
                id: 2,
                icon: PlusCircleIcon,
                url: '/practitioner/add',
                text: 'Add Practitioner',
                orderMenu: 2,
                allowedRoles: ['administrative_hr'],
            },
            {
                id: 3,
                icon: Info,
                url: '/communication/communication-list',
                text: 'Communications',
                orderMenu: 3,
                allowedRoles: ['administrative_hr'],
            },
            {
                id: 4,
                icon: PlusCircleIcon,
                url: '/communication/add',
                text: 'Add Communication',
                orderMenu: 4,
                allowedRoles: ['administrative_hr'],
            },
        ],
    },
]
