import { Card, CardContent } from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import AddNewPatientForm from '@/resources/patient/components/AddNewPatientForm'
import content from './AddNewPatient.content'

const AddNewPatient = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <Card>
                    <CardContent>
                        <AddNewPatientForm />
                    </CardContent>
                </Card>
            </ContentArticle>
        </>
    )
}

export default AddNewPatient
