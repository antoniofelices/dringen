import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@hooks/useAuth'
import { getSingleUser } from '@/services/supabaseService'
import { Button } from '@components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import ButtonSignOut from '@/components/ui/ButtonSignOut'
import ErrorApi from '@components/ui/ErrorApi'
import FormFieldInput from '@/components/ui/FormFieldInputControl'
import Loading from '@components/ui/Loading'
import content from '@data/settings/account'

const Account = () => {
    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async () => {
        // Send data to Supabase
    }

    const {
        data: profileData,
        isPending: profileLoading,
        isError: profileError,
        error: profileErrorType,
    } = useQuery({
        queryKey: ['singleProfile', user?.id],
        queryFn: () => getSingleUser(user!.id),
        enabled: !!user,
    })

    if (profileLoading) return <Loading />
    if (profileError && profileErrorType)
        return <ErrorApi message={profileErrorType.message} />

    return (
        <>
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>{content.textAccount}</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="mb-6">
                            <li className="my-1">
                                <span className="font-bold">Name</span>:{' '}
                                {profileData.user_name}{' '}
                                {profileData.user_last_name}
                            </li>
                            <li className="my-1">
                                <span className="font-bold">Email</span>:{' '}
                                {profileData.email}
                            </li>
                        </ul>
                        <ButtonSignOut />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>{content.textSecurity}</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <FormFieldInput
                                label="Reset Password"
                                fieldName="resetPassword"
                                type="password"
                                register={register}
                                errors={errors}
                            /> */}
                            <Button type="submit" className="mr-2">
                                {isSubmitting ? 'Reset' : 'Saving'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>{content.textNotifications}</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
            </div>
        </>
    )
}

export default Account
