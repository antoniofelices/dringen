import { useCallback, useEffect, useState } from 'react'
import { useLogger } from '@shared/hooks/useLogger'
import { fetchEncounterList } from '@workflows/clinical-encounter/services/fetchEncounterList'
import type { EncounterWithConditionType } from '@workflows/clinical-encounter/types/clinicalEncounter.model'

export const useEncounterList = (patientId: string) => {
    const [items, setItems] = useState<EncounterWithConditionType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { logError } = useLogger('EncounterList')

    const load = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const { encounters, conditions } =
                await fetchEncounterList(patientId)

            const matched: EncounterWithConditionType[] = encounters.map(
                (encounter) => {
                    const encounterRef = `Encounter/${encounter.id}`
                    const condition = conditions.find(
                        (c) => c.encounter?.reference === encounterRef
                    )
                    return { encounter, condition }
                }
            )

            setItems(matched)
        } catch (err) {
            logError('Failed to load encounter list', err, 'useEncounterList')
            setError('Failed to load encounters')
        } finally {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientId])

    useEffect(() => {
        load()
    }, [load])

    return { items, loading, error, reload: load }
}
