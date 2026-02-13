import type { Organization } from '@medplum/fhirtypes'
import type { OrganizationType } from '@resources/organization/types/organization.model'

export function fhirToOrganization(
    organization: Organization
): OrganizationType {
    return {
        id: organization.id ?? '',
        name: organization.name ?? '',
        type: organization.type?.[0]?.coding?.[0]?.display ?? '',
        identifier: organization.identifier?.[0]?.value ?? '',
    }
}
