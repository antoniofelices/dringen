import { Card, CardContent } from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import AddNewPractitionerForm from '@/resources/practitioner/components/AddNewPractitionerForm'
import content from './AddNewPractitioner.content'

const AddNewPractitioner = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <Card>
                    <CardContent>
                        <AddNewPractitionerForm />
                    </CardContent>
                </Card>
            </ContentArticle>
        </>
    )
}

export default AddNewPractitioner
