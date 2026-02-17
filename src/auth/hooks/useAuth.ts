import { useState, useEffect } from 'react'
import type { ProfileResource } from '@medplum/core'
import { medplum } from '@shared/fhir/medplum'

export const useAuth = () => {
    const [profile, setProfile] = useState<ProfileResource | undefined>(
        medplum.getProfile()
    )
    const [loading, setLoading] = useState(!medplum.isInitialized)

    useEffect(() => {
        const handleChange = () => {
            setProfile(medplum.getProfile())
            setLoading(false)
        }

        medplum.addEventListener('change', handleChange)

        if (!medplum.getProfile()) {
            medplum
                .getProfileAsync()
                .then((p) => {
                    setProfile(p)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }

        return () => medplum.removeEventListener('change', handleChange)
    }, [])

    return {
        profile,
        loading,
        isLoggedIn: !!profile,
    }
}
