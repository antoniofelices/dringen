import type { Practitioner } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'
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

export const getListPhysicians = async (): Promise<Practitioner[]> => {
    try {
        await authenticateMedplum()

        const practitionerIds = await getPractitionerIdsByRole('doctor')

        if (practitionerIds.length === 0) return []

        const practitioners = await medplum.searchResources('Practitioner', {
            _id: practitionerIds.join(','),
            _count: 1000,
        })

        return practitioners
    } catch (error) {
        logger.error('Error fetching physicians from Server', error, {
            component: 'practitioner.service',
            action: 'getListPhysicians',
        })
        throw error
    }
}
