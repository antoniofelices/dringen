import '@/styles/calendar.css'
import { Link } from '@tanstack/react-router'
import { Button } from '@shared/components/ui/base/button'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './AppointmentList.content'

const AppointmentList = () => {
    return (
        <>
            <HeaderArticle title={content.title}>
                <Button asChild size="sm">
                    <Link to="/patient/add">{content.textButtonAdd}</Link>
                </Button>
            </HeaderArticle>
            <ContentArticle>'A list of Appointments'</ContentArticle>
            <ButtonBack />
        </>
    )
}

export default AppointmentList
