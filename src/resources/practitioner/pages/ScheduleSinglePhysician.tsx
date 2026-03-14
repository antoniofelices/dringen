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
                <div className="grid grid-cols-2 gap-4">
                    <AppointmentListByPractitioner practitionerId={id} />
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default ScheduleSinglePhysician
