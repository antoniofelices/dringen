import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@hooks/useAuth'
import { getSingleUser } from '@/services/supabaseService'
import {
    Card,
    CardAction,
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
import HeaderArticle from '@/components/ui/HeaderArticle'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import content from '@/config/data/authz/settings'

const Settings = () => {
    const { user } = useAuth()

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
                        <div>
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
                        </div>
                    </TabsContent>
                    <TabsContent value="appearance">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <h2>Appearance</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
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
