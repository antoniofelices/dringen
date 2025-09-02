import { useQuery } from '@tanstack/react-query'
import { getSingleUser } from '@/services/supabaseService'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import DisplayDetails from '@/components/user/DisplayDetails'
import AddActions from '@/components/user/AddActions'
import content from '@/config/data/pages/singleUser'

const SingleUser = ({ id }: { id: string }) => {
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

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <DisplayDetails personData={personData} />
                <AddActions />
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SingleUser
