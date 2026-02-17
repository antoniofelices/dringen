import type { Practitioner } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'
import type { PractitionerRoleInfo } from '@resources/practitioner-role/types/practitionerRole.model'
import type { PractitionerWithSpecialty } from '@resources/practitioner/types/practitioner.model'
import { getPractitionerIdsByRole } from '@resources/practitioner-role/services/practitionerRole.service'

export const getListPractitioners = async (): Promise<Practitioner[]> => {
    try {
        await authenticateMedplum()

        const bundle = await medplum.searchResources('Practitioner', {
            _count: 1000,
        })

        return bundle
    } catch (error) {
        logger.error('Error fetching practitioners from Server', error, {
            component: 'practitioner.service',
            action: 'getListPractitioners',
        })
        throw error
    }
}

export const getListPhysicians = async (): Promise<
    PractitionerWithSpecialty[]
> => {
    try {
        await authenticateMedplum()

        const roleInfos = await getPractitionerIdsByRole('doctor')

        if (roleInfos.length === 0) return []

        const ids = roleInfos.map((info) => info.practitionerId)

        const practitioners = await medplum.searchResources('Practitioner', {
            _id: ids.join(','),
            _count: 1000,
        })

        const specialtyByPractitionerId = new Map<string, string>(
            roleInfos.map((info: PractitionerRoleInfo) => [
                info.practitionerId,
                info.specialty,
            ])
        )

        return practitioners.map((practitioner) => ({
            practitioner,
            specialty:
                specialtyByPractitionerId.get(practitioner.id ?? '') ?? '',
        }))
    } catch (error) {
        logger.error('Error fetching physicians from Server', error, {
            component: 'practitioner.service',
            action: 'getListPhysicians',
        })
        throw error
    }
}
