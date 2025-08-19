import { useQuery } from '@tanstack/react-query'
import { transformDate } from '@/lib/utils'
import { getSingleUser } from '@/services/supabaseService'
import { Button } from '@/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import { Switch } from '@/components/ui/base/switch'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import content from '@/config/data/authz/user/single'

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
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="mb-8">{content.textDetails}</h2>
                        </CardTitle>
                        <CardAction>
                            <button className="text-xs">Editar</button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li className="my-2">
                                {content.textName}: {personData.user_name}{' '}
                                {personData.user_last_name}
                            </li>
                            <li className="my-2">
                                {content.textRole}: {personData.role}
                            </li>
                            <li className="my-2">
                                {content.textEmail}: {personData.email}
                            </li>
                            <li className="my-2">
                                {content.textCreatedAt}:{' '}
                                {transformDate(`${personData.created_at}`)}
                            </li>
                            <li className="my-2">
                                {content.textUpdatedAt}:{' '}
                                {transformDate(`${personData.updated_at}`)}
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="mb-8">{content.titleActions}</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li className="lg:flex justify-between">
                                {content.textDeactiveAccount}
                                <Switch />
                            </li>
                            <li className="lg:flex justify-between mt-4">
                                {content.textDeleteAccount}
                                <Button size="sm">
                                    {content.textButtonDelete}
                                </Button>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SingleUser
