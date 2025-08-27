import { Card, CardContent } from '@/components/ui/base/card'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import RegisterPatientForm from '@/components/patient/RegisterPatientForm'
import content from '@/config/data/patient/add'

const AddPatient = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <CardContent>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent>
                            <RegisterPatientForm />
                        </CardContent>
                    </Card>
                </CardContent>
            </ContentArticle>
        </>
    )
}

export default AddPatient
