import { useState, useEffect } from 'react'
import type { ProfileResource } from '@medplum/core'
import type { Project } from '@medplum/fhirtypes'
import { medplum } from '@shared/fhir/medplum'
import { accessPolicyToUserRole } from '@auth/domain/auth.adapter'
import type { UserRoleType, AuthMeResponse } from '@auth/types/auth.model'
import { AuthContext } from './authContext'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<ProfileResource | undefined>(
        medplum.getProfile()
    )
    const [role, setRole] = useState<UserRoleType | null>(null)
    const [project, setProject] = useState<Project | undefined>(
        medplum.getProject()
    )
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleChange = async () => {
            const newProfile = medplum.getProfile()
            setProfile(newProfile)
            const newProject = medplum.getProject()
            setProject(newProject)

            if (newProfile) {
                try {
                    const authMe = (await medplum.get(
                        'auth/me'
                    )) as AuthMeResponse
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
        project,
        loading,
        isLoggedIn: !!profile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
