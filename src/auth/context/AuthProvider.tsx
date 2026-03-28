import { useState, useEffect } from 'react'
import type { ProfileResource } from '@medplum/core'
import { medplum } from '@shared/fhir/medplum'
import type { UserRoleType } from '@auth/types/auth.model'
import { accessPolicyToUserRole, type AuthMeResponse } from '@auth/domain/auth.adapter'
import { AuthContext } from './authContext'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<ProfileResource | undefined>(
        medplum.getProfile()
    )
    const [role, setRole] = useState<UserRoleType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleChange = async () => {
            const newProfile = medplum.getProfile()
            setProfile(newProfile)

            if (newProfile) {
                try {
                    const authMe = await medplum.get('auth/me') as AuthMeResponse
                    setRole(accessPolicyToUserRole(authMe?.accessPolicy))
                } catch {
                    setRole(null)
                }
            } else {
                setRole(null)
            }

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
        role,
        loading,
        isLoggedIn: !!profile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
