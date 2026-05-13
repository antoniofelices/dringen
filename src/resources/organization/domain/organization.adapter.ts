import type { Organization } from '@medplum/fhirtypes'
import type {
    OrganizationType,
    OrganizationDetailsFormType,
} from '@resources/organization/types/organization.model'

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

export function organizationDetailsToFhir(
    formData: OrganizationDetailsFormType,
    existing: Organization
): Organization {
    const telecom = [...(existing.telecom ?? [])]
    const phoneIdx = telecom.findIndex((t) => t.system === 'phone')
    const emailIdx = telecom.findIndex((t) => t.system === 'email')

    if (phoneIdx >= 0)
        telecom[phoneIdx] = { ...telecom[phoneIdx], value: formData.phone }
    else telecom.push({ system: 'phone', value: formData.phone })

    if (emailIdx >= 0)
        telecom[emailIdx] = {
            ...telecom[emailIdx],
            value: formData.email ?? '',
        }
    else telecom.push({ system: 'email', value: formData.email ?? '' })

    const contacts = [...(existing.contact ?? [])]
    const adminContact = { ...(contacts[0] ?? {}) }
    const adminTelecom = [...(adminContact.telecom ?? [])]
    const adminPhoneIdx = adminTelecom.findIndex((t) => t.system === 'phone')
    const adminEmailIdx = adminTelecom.findIndex((t) => t.system === 'email')

    if (adminPhoneIdx >= 0)
        adminTelecom[adminPhoneIdx] = {
            ...adminTelecom[adminPhoneIdx],
            value: formData.adminPhone,
        }
    else adminTelecom.push({ system: 'phone', value: formData.adminPhone })

    if (adminEmailIdx >= 0)
        adminTelecom[adminEmailIdx] = {
            ...adminTelecom[adminEmailIdx],
            value: formData.adminEmail ?? '',
        }
    else
        adminTelecom.push({ system: 'email', value: formData.adminEmail ?? '' })

    adminContact.telecom = adminTelecom
    contacts[0] = adminContact

    const identifier = [...(existing.identifier ?? [])]
    if (identifier.length > 0)
        identifier[0] = { ...identifier[0], value: formData.identifier }
    else identifier.push({ value: formData.identifier })

    const address = [...(existing.address ?? [])]
    if (address.length > 0)
        address[0] = { ...address[0], text: formData.address }
    else address.push({ text: formData.address })

    const type = [...(existing.type ?? [])]
    if (type.length > 0 && type[0].coding && type[0].coding.length > 0) {
        type[0] = {
            ...type[0],
            coding: [{ ...type[0].coding[0], display: formData.type }],
        }
    }

    return {
        ...existing,
        name: formData.name,
        type,
        identifier,
        address,
        telecom,
        contact: contacts,
    }
}
