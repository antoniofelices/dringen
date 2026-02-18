import { useState, useEffect } from 'react'
import type { ProfileResource } from '@medplum/core'
import { medplum } from '@shared/fhir/medplum'
import { AuthContext } from './authContext'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<ProfileResource | undefined>(
        medplum.getProfile()
    )
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleChange = () => {
            setProfile(medplum.getProfile())
            setLoading(false)
        }

        medplum.addEventListener('change', handleChange)

        medplum.getInitPromise().then(() => {
            handleChange()
        })

        return () => medplum.removeEventListener('change', handleChange)
    }, [])

    const value = {
        profile,
        loading,
        isLoggedIn: !!profile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
