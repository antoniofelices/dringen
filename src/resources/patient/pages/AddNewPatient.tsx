import { Card, CardContent } from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import AddNewPatientForm from '@/resources/patient/components/AddNewPatientForm'
import content from './AddNew.content'

const AddNewPatient = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <CardContent>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent>
                            <AddNewPatientForm />
                        </CardContent>
                    </Card>
                </CardContent>
            </ContentArticle>
        </>
    )
}

export default AddNewPatient
