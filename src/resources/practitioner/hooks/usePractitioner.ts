// import { useMemo } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { getUsers } from '@services/supabaseService'

export const useAdministrative = () => {
    // const {
    //     data: userData,
    //     isPending: userLoading,
    //     isError: userError,
    //     error: userErrorType,
    //     refetch: userRefetch,
    // } = useQuery({
    //     queryKey: ['listUsers'],
    //     queryFn: () => getUsers(),
    // })
    // return {
    //     users: userData,
    //     isPending: userLoading,
    //     isError: userError,
    //     error: userErrorType,
    //     refetch: userRefetch,
    // }
}

export const usePhysician = () => {
    // const { users } = useUsers()
    // const usersData = useMemo(() => {
    //     return (
    //         users
    //             ?.filter(
    //                 (item) => item.role != null && item.role === 'physician'
    //             )
    //             .map((item) => ({
    //                 name: `${item.user_last_name} ${item.user_name}`,
    //                 id: item.id,
    //             }))
    //             .sort((a, b) => a.name.localeCompare(b.name)) || []
    //     )
    // }, [users])
    // return usersData
}
