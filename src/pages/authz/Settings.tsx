import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@hooks/useAuth'
import { useTheme } from '@hooks/useTheme'
import { getSingleUser } from '@/services/supabaseService'
import { Button } from '@components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@components/ui/base/tabs'
import ButtonSignOut from '@/components/ui/ButtonSignOut'
import ContentArticle from '@/components/ui/ContentArticle'
import ErrorApi from '@components/ui/ErrorApi'
import HeaderArticle from '@/components/ui/HeaderArticle'
import FormFieldInput from '@components/ui/FormFieldInput'
import Loading from '@components/ui/Loading'
import content from '@/config/data/authz/settings'

const Settings = () => {
    const { user } = useAuth()
    const { setTheme } = useTheme()

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
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <Tabs aria-label="Settings" defaultValue="account">
                    <div className="flex justify-between items-center">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="appearance">
                                Appearance
                            </TabsTrigger>
                            <TabsTrigger value="notifications">
                                Notifications
                            </TabsTrigger>
                            <TabsTrigger value="terms-of-use">
                                Terms of use
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="account">
                        <div className="grid grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <h2>Account</h2>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="mb-6">
                                        <li className="my-1">
                                            <span className="font-bold">
                                                Name
                                            </span>
                                            : {profileData.user_name}{' '}
                                            {profileData.user_last_name}
                                        </li>
                                        <li className="my-1">
                                            <span className="font-bold">
                                                Email
                                            </span>
                                            : {profileData.email}
                                        </li>
                                    </ul>
                                    <ButtonSignOut />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <h2>Security</h2>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormFieldInput
                                            label="Reset Password"
                                            fieldName="resetPassword"
                                            type="password"
                                            register={register}
                                            errors={errors}
                                        />
                                        <Button type="submit" className="mr-2">
                                            {isSubmitting ? 'Reset' : 'Saving'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="appearance">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <h2>Appearance</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-6">
                                    <div
                                        onClick={() => setTheme('light')}
                                        className="rounded-lg cursor-pointer bg-white dark:bg-blue-800"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' ||
                                                e.key === ' '
                                            ) {
                                                e.preventDefault()
                                            }
                                        }}
                                    >
                                        Light
                                    </div>
                                    <div
                                        onClick={() => setTheme('dark')}
                                        className="rounded-lg cursor-pointer bg-white dark:bg-blue-800"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' ||
                                                e.key === ' '
                                            ) {
                                                e.preventDefault()
                                            }
                                        }}
                                    >
                                        Dark
                                    </div>
                                    <div
                                        onClick={() => setTheme('system')}
                                        className="rounded-lg cursor-pointer bg-white dark:bg-blue-800"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' ||
                                                e.key === ' '
                                            ) {
                                                e.preventDefault()
                                            }
                                        }}
                                    >
                                        System
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <h2>Notifications</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="terms-of-use">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <h2>Terms of use</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </ContentArticle>
        </>
    )
}

export default Settings
