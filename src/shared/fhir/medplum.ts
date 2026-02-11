import { MedplumClient } from '@medplum/core'
import { MEDPLUM_CONFIG } from '@config/config'

export const medplum = new MedplumClient({
    baseUrl: MEDPLUM_CONFIG.baseUrl,
    clientId: MEDPLUM_CONFIG.clientId,
})

let authPromise: Promise<void> | null = null

export const authenticateMedplum = () => {
    if (authPromise) return authPromise

    if (medplum.getActiveLogin()) {
        return Promise.resolve()
    }

    if (MEDPLUM_CONFIG.clientSecret) {
        authPromise = medplum
            .startClientLogin(
                MEDPLUM_CONFIG.clientId,
                MEDPLUM_CONFIG.clientSecret
            )
            .then(() => {})
    }

    return authPromise ?? Promise.resolve()
}
