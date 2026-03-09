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
            <ContentArticle>
                <p>Listado de todas las citas futuras 🤯</p>
                <p>Filtrado por paciente</p>
                <p>
                    Quizas tabs: 1.Citas de hoy 2.Citas de la semana 3.Resto de
                    citas
                </p>
                <hr className="my-4" />
                <p>Contenido de cada cita:</p>
                <ul>
                    <li>Dia y hora</li>
                    <li>Physician</li>
                    <li>Facility</li>
                    <li>
                        Status - opcion cambiar status (booked, arrived,
                        cancelled == anula la cita, libera slot en el
                        practitioner)
                    </li>
                </ul>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default AppointmentList
