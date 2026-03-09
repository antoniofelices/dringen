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
                <h2>
                    // Esto va a ser un componente.
                    <br />
                    // Valorar si se va a reutilizar en Single Practitioner
                    <br />
                    // Si tiene demasiada logica el apartado de status no
                    reutilizar en Single Practitioner
                </h2>
                <p className="mt-4">Contenido de cada cita:</p>
                <ul>
                    <li>Dia y hora</li>
                    <li>Nombre Patient</li>
                    <li>Telefono. Opcional solo aqui.</li>
                    <li>Nombre Physician. Opcional solo aqui.</li>
                    <li>Facility. Opcional solo aqui.</li>
                    <li>
                        Status - opcion cambiar status (booked, arrived,
                        cancelled == anula la cita, libera slot en el
                        practitioner). Opcional solo aqui.
                    </li>
                </ul>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default AppointmentList
