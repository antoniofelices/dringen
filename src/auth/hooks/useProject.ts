import { useAuthContext } from '@auth/hooks/useAuthContext'

export const useProject = () => {
    const { project, loading } = useAuthContext()

    return {
        project,
        isPending: loading,
    }
}
