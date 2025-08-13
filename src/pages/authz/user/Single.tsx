import { useQuery } from '@tanstack/react-query'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'
import ButtonBack from '@components/ui/ButtonBack'

import { getSingleUser } from '@/services/supabaseService'

import content from '@/config/data/authz/userSingle'

const Single = ({ id }: { id: string }) => {
    const {
        data: personData,
        isPending: personLoading,
        isError: personError,
        error: personErrorType,
    } = useQuery({
        queryKey: ['singleUser', id],
        queryFn: () => getSingleUser(id),
    })

    if (personLoading) return <Loading />

    if (personError && personErrorType)
        return <ErrorApi message={personErrorType.message} />

    console.log(personData)

    return (
        <>
            <h1 className="mb-8">
                {content.title}: {personData.user_name}{' '}
                {personData.user_last_name}
            </h1>
            <ul>
                <li>
                    {content.textRole}: {personData.role}
                </li>
                <li>
                    {content.textCreatedAt}: {personData.created_at}
                </li>
            </ul>
            <ButtonBack />
        </>
    )
}

export default Single
