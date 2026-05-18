import { MedplumClient } from '@medplum/core'
import { MEDPLUM_CONFIG } from '@/shared/fhir/config'

export const medplum = new MedplumClient({
    baseUrl: MEDPLUM_CONFIG.baseUrl,
    clientId: MEDPLUM_CONFIG.clientId,
})
