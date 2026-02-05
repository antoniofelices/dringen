import { Link } from '@tanstack/react-router'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './PatientListSinglePhysician.content'

const PatientListSinglePysician = ({ id }: { id: string }) => {
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
                    <li>
                        <Link to="/patient/VARIABLE">
                            Acceso a cada single Patient{' '}
                        </Link>
                    </li>{' '}
                </ul>
            </ContentArticle>
        </>
    )
}

export default PatientListSinglePysician
