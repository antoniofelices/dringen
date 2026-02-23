import { useCallback, useEffect, useState } from 'react'
import { useLogger } from '@shared/hooks/useLogger'
import { fetchClinicalEncounter } from '@workflows/clinical-encounter/services/fetchClinicalEncounter'
import type { ClinicalEncounterReadResponseType } from '@workflows/clinical-encounter/types/clinicalEncounter.model'

export const useReadClinicalEncounter = (encounterId: string | null) => {
    const [data, setData] = useState<ClinicalEncounterReadResponseType | null>(
        null
    )
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { logError } = useLogger('ReadClinicalEncounter')

    const load = useCallback(async () => {
        if (!encounterId) {
            setData(null)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const result = await fetchClinicalEncounter(encounterId)
            setData(result)
        } catch (err) {
            logError('Failed to load clinical encounter', err, 'useReadClinicalEncounter')
            setError('Failed to load clinical encounter')
        } finally {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [encounterId])

    useEffect(() => {
        load()
    }, [load])

    return { data, loading, error }
}
