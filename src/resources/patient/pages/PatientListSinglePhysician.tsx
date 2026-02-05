import { useNavigate } from '@tanstack/react-router'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './PatientListSinglePhysician.content'

const PatientListSinglePysician = ({ id }: { id: string }) => {
    const navigate = useNavigate()

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <p>Lista de pacientes de UN Medico Singular.</p>
                <p>Tabla con:</p>
                <ul>
                    <li>Nombre</li>
                    <li>Apellido</li>
                    <li>DNI</li>
                    <li>Acceso a cada single Patient</li>
                </ul>
            </ContentArticle>
        </>
    )
}

export default PatientListSinglePysician
