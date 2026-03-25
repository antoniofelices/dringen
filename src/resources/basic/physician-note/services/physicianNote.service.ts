import type { Basic } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'
import { PHYSICIAN_NOTE_CODE } from '@resources/basic/physician-note/config/config'

export const getPhysicianNotesByPractitioner = async (
    practitionerId: string
): Promise<Basic[]> => {
    try {
        await authenticateMedplum()
        return await medplum.searchResources('Basic', {
            subject: `Practitioner/${practitionerId}`,
            code: PHYSICIAN_NOTE_CODE,
            _count: 1000,
            _sort: '-_lastUpdated',
        })
    } catch (error) {
        logger.error('Error fetching physician notes from Server', error, {
            component: 'physicianNote.service',
            action: 'getPhysicianNotesByPractitioner',
        })
        throw error
    }
}

export const createPhysicianNote = async (note: Basic): Promise<Basic> => {
    try {
        await authenticateMedplum()
        return await medplum.createResource(note)
    } catch (error) {
        logger.error('Error creating physician note in Server', error, {
            component: 'physicianNote.service',
            action: 'createPhysicianNote',
        })
        throw error
    }
}

export const updatePhysicianNote = async (
    id: string,
    note: Basic
): Promise<Basic> => {
    try {
        await authenticateMedplum()
        return await medplum.updateResource({ ...note, id })
    } catch (error) {
        logger.error('Error updating physician note in Server', error, {
            component: 'physicianNote.service',
            action: 'updatePhysicianNote',
        })
        throw error
    }
}

export const deletePhysicianNote = async (id: string): Promise<void> => {
    try {
        await authenticateMedplum()
        await medplum.deleteResource('Basic', id)
    } catch (error) {
        logger.error('Error deleting physician note in Server', error, {
            component: 'physicianNote.service',
            action: 'deletePhysicianNote',
        })
        throw error
    }
}
