import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import AppointmentListByPractitioner from '@resources/appointment/components/AppointmentListByPractitioner'
import content from './ScheduleSinglePhysician.content'

const ScheduleSinglePhysician = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <AppointmentListByPractitioner practitionerId={id} />
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default ScheduleSinglePhysician
