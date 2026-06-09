import type { OrganizationType } from '@resources/organization/types/organization.model'
import { contentES as content } from './OrganizationDetails.content'

export const buildDataItems = (organization: OrganizationType) => [
    { label: content.labelName, value: organization.name },
    { label: content.labelType, value: organization.type },
    { label: content.labelIdentifier, value: organization.identifier },
    { label: content.labelAddress, value: organization.address },
    { label: content.labelGeneralPhone, value: organization.phone },
    { label: content.labelGeneralEmail, value: organization.email },
    { label: content.labelAdminPhone, value: organization.adminPhone },
    { label: content.labelAdminEmail, value: organization.adminEmail },
]
