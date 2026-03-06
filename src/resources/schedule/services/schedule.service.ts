import type { Schedule } from '@medplum/fhirtypes'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { logger } from '@shared/utils/Logger'

export const getScheduleByPractitioner = async (
    practitionerId: string
): Promise<Schedule | undefined> => {
    try {
        await authenticateMedplum()

        const schedules = await medplum.searchResources('Schedule', {
            actor: `Practitioner/${practitionerId}`,
            _count: '1',
        })

        return schedules[0]
    } catch (error) {
        logger.error('Error fetching schedule from Server', error, {
            component: 'schedule.service',
            action: 'getScheduleByPractitioner',
        })
        throw error
    }
}

export const createSchedule = async (
    schedule: Schedule
): Promise<Schedule> => {
    try {
        await authenticateMedplum()

        return await medplum.createResource(schedule)
    } catch (error) {
        logger.error('Error creating schedule in Server', error, {
            component: 'schedule.service',
            action: 'createSchedule',
        })
        throw error
    }
}
