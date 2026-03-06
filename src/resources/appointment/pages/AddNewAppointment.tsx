import { Card, CardContent } from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
// import AddNewAppointmentForm from '@resources/appointment/components/AddNewAppointmentForm'
import { BookAppointmentForm } from '@workflows/clinical-appointment/index'
import content from './AddNewAppointment.content'

const AddNewAppointment = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <CardContent>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent>
                            {/* <AddNewAppointmentForm /> */}
                            <BookAppointmentForm />
                        </CardContent>
                    </Card>
                </CardContent>
            </ContentArticle>
        </>
    )
}

export default AddNewAppointment
