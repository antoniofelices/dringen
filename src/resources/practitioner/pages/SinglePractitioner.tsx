import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import PractitionerDetails from '@resources/practitioner/components/PractitionerDetails/PractitionerDetails'
import { useSinglePractitioner } from '@/resources/practitioner/hooks/useGetPractitioner'
import { AppointmentSelector } from '@workflows/clinical-appointment'

const SinglePractitioner = ({ id }: { id: string }) => {
    const { practitioner } = useSinglePractitioner(id)
    if (!practitioner) return null

    return (
        <>
            <HeaderArticle
                title={`${practitioner.firstName} ${practitioner.lastName}`}
            />
            <ContentArticle>
                <PractitionerDetails practitionerId={id} />
                <AppointmentSelector practitionerId={id} />
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SinglePractitioner
