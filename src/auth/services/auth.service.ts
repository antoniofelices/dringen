import type { ProfileResource } from '@medplum/core'
import { medplum } from '@shared/fhir/medplum'
import { MEDPLUM_CONFIG } from '@config/config'
import { logger } from '@shared/utils/Logger'

export const signIn = async (
    email: string,
    password: string
): Promise<ProfileResource> => {
    try {
        const response = await medplum.startLogin({
            email,
            password,
            projectId: MEDPLUM_CONFIG.projectId,
        })

        if (response.code) {
            return await medplum.processCode(response.code)
        }

        throw new Error('Login failed: no authentication code received')
    } catch (error) {
        logger.error('Error signing in', error, {
            component: 'auth.service',
            action: 'signIn',
        })
        throw error
    }
}

export const signOut = async (): Promise<void> => {
    try {
        await medplum.signOut()
    } catch (error) {
        logger.error('Error signing out', error, {
            component: 'auth.service',
            action: 'signOut',
        })
        throw error
    }
}
