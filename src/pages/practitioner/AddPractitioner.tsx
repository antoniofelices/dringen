import { Card, CardContent } from '@/components/ui/base/card'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import RegisterUserForm from '@/components/user/RegisterUserForm'
import content from '@/config/data/pages/addUser'

const AddUser = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <CardContent>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent>
                            <RegisterUserForm />
                        </CardContent>
                    </Card>
                </CardContent>
            </ContentArticle>
        </>
    )
}

export default AddUser
