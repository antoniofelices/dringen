import type { Slot } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getSlotsBySchedule = async (
    scheduleId: string
): Promise<Slot[]> => {
    try {
        await authenticateMedplum()

        return await medplum.searchResources('Slot', {
            schedule: `Schedule/${scheduleId}`,
            _count: '200',
            _sort: 'start',
        })
    } catch (error) {
        logger.error('Error fetching slots from Server', error, {
            component: 'slot.service',
            action: 'getSlotsBySchedule',
        })
        throw error
    }
}

export const updateSlot = async (
    id: string,
    slot: Slot
): Promise<Slot> => {
    try {
        await authenticateMedplum()

        return await medplum.updateResource({ ...slot, id })
    } catch (error) {
        logger.error('Error updating slot in Server', error, {
            component: 'slot.service',
            action: 'updateSlot',
        })
        throw error
    }
}
