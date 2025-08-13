import { useQuery } from '@tanstack/react-query'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'
import ButtonBack from '@components/ui/ButtonBack'

import { getSingleUser } from '@/services/supabaseService'

import content from '@/config/data/authz/userSingle'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import { Button } from '@/components/ui/base/button'
import { Switch } from '@/components/ui/base/switch'

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
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h1 className="mb-8">{content.title}</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>
                            {content.textName}: {personData.user_name}{' '}
                            {personData.user_last_name}
                        </li>
                        <li>
                            {content.textRole}: {personData.role}
                        </li>
                        <li>
                            {content.textEmail}: {personData.email}
                        </li>
                        <li>
                            {content.textCreatedAt}: {personData.created_at}
                        </li>
                        <li>
                            {content.textUpdatedAt}: {personData.updated_at}
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
            <ButtonBack />
        </div>
    )
}

export default Single
