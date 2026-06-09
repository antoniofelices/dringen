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
import { contentES as content } from './sidebarMenu.content'
import type { SidebarMenuContent } from './sidebarMenu.content'

export const sidebarMenu = (practitionerId: string, labels: SidebarMenuContent = content): NavigationGroup[] => [
    {
        id: 'physician',
        title: labels.titlePhysician,
        allowedRoles: ['doctor'],
        items: [
            {
                id: 1,
                icon: ClipboardPlus,
                url: `/practitioner/${practitionerId}/schedule`,
                text: labels.mySchedule,
                orderMenu: 1,
            },
            {
                id: 2,
                icon: Users,
                url: `/practitioner/${practitionerId}/patient-list`,
                text: labels.myPatients,
                orderMenu: 2,
            },
            {
                id: 3,
                icon: PlusCircle,
                url: '/patient/add',
                text: labels.addPatient,
                orderMenu: 3,
            },
        ],
    },
    {
        id: 'administrative',
        title: labels.titleAdministrative,
        allowedRoles: ['administrative', 'administrative_hr'],
        items: [
            {
                id: 1,
                icon: ClipboardPlus,
                url: '/patient/patient-list',
                text: labels.patientsList,
                orderMenu: 1,
            },
            {
                id: 2,
                icon: PlusCircleIcon,
                url: '/patient/add',
                text: labels.addPatient,
                orderMenu: 2,
            },
            {
                id: 3,
                icon: CalendarDays,
                url: '/appointment/appointment-list',
                text: labels.appointments,
                orderMenu: 3,
            },
            {
                id: 4,
                icon: PlusCircleIcon,
                url: '/appointment/add',
                text: labels.addAppointment,
                orderMenu: 4,
            },
            {
                id: 5,
                icon: Users,
                url: '/practitioner/physician-list',
                text: labels.physiciansList,
                orderMenu: 5,
            },
        ],
    },
    {
        id: 'organization',
        title: labels.titleOrganization,
        items: [
            {
                id: 1,
                icon: Building,
                url: `/organization/${MEDPLUM_CONFIG.organizationId}`,
                text: labels.organization,
                orderMenu: 1,
            },
            {
                id: 2,
                icon: PlusCircleIcon,
                url: '/practitioner/add',
                text: labels.addPractitioner,
                orderMenu: 2,
                allowedRoles: ['administrative_hr'],
            },
            {
                id: 3,
                icon: Info,
                url: '/communication/communication-list',
                text: labels.communications,
                orderMenu: 3,
                allowedRoles: ['administrative_hr'],
            },
            {
                id: 4,
                icon: PlusCircleIcon,
                url: '/communication/add',
                text: labels.addCommunication,
                orderMenu: 4,
                allowedRoles: ['administrative_hr'],
            },
        ],
    },
]
