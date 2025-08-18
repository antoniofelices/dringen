import RegisterUserForm from '@/components/user/RegisterUserForm'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ContentArticle from '@/components/ui/ContentArticle'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import content from '@/config/data/authz/user/add'

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
