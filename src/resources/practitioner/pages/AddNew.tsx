import { Card, CardContent } from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import RegisterPractitionerForm from '@resources/practitioner/components/RegisterForm'
import content from './AddNew.content'

const AddUser = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <CardContent>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent>
                            <RegisterPractitionerForm />
                        </CardContent>
                    </Card>
                </CardContent>
            </ContentArticle>
        </>
    )
}

export default AddUser
