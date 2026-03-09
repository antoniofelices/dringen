import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import AddNewAppointmentForm from '@resources/appointment/components/AddNewAppointmentForm'
import content from './AddNewAppointment.content'

const AddNewAppointment = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <AddNewAppointmentForm />
            </ContentArticle>
        </>
    )
}

export default AddNewAppointment
