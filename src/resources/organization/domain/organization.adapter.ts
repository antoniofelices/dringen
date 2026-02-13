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
        address: organization.address?.[0]?.text ?? '',
        phone:
            organization.telecom?.find((t) => t.system === 'phone')?.value ??
            '',
        email:
            organization.telecom?.find((t) => t.system === 'email')?.value ??
            '',
        adminContact: organization.contact?.[0]?.name?.text ?? '',
        adminPhone:
            organization.contact?.[0]?.telecom?.find(
                (t) => t.system === 'phone'
            )?.value ?? '',
        adminEmail:
            organization.contact?.[0]?.telecom?.find(
                (t) => t.system === 'email'
            )?.value ?? '',
    }
}
