import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import content from '@/config/data/pages/calendarPatient'

const CalendarPatient = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>Appointments calendar</ContentArticle>
            <ButtonBack />
        </>
    )
}

export default CalendarPatient
