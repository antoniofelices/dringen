import { Calendar } from 'lucide-react'
import { theDateAndTime } from '@shared/utils/utils'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import NotesPractitioner from '@resources/basic/physician-note/components/NotesPractitioner'
import AppointmentListByPractitioner from '@resources/appointment/components/AppointmentListByPractitioner'
import content from './ScheduleSinglePhysician.content'

const ScheduleSinglePhysician = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title}>
                <div className="flex gap-2 items-center">
                    <Calendar size="12" />
                    {theDateAndTime()}
                </div>
            </HeaderArticle>
            <ContentArticle>
                <div className="grid grid-cols-2 gap-4">
                    <AppointmentListByPractitioner practitionerId={id} />
                    <NotesPractitioner />
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default ScheduleSinglePhysician
