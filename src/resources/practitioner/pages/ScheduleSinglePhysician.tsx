import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './ScheduleSinglePhysician.content'

const ScheduleSinglePhysician = ({ id }: { id: string }) => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <p>Agenda del dia de Un Medico Singular.</p>
                <hr className="my-4" />
                <p>Metaboxes:</p>
                <ul className="list-disc my-2">
                    <li>
                        Agenda del dia. Listado de citas, mas sencillo que
                        Appointments, solo: hora + nombre paciente
                    </li>
                    <li>
                        Notas. Input donde se puede añadir texto. Posibilidad de
                        borrar nota.
                    </li>
                </ul>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default ScheduleSinglePhysician
