import { Phone } from 'lucide-react'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import PractitionerDetails from '@resources/practitioner/components/PractitionerDetails/PractitionerDetails'
import { useSinglePractitioner } from '@/resources/practitioner/hooks/useGetPractitioner'
import AppointmentSelector from '@resources/appointment/components/AppointmentSelector'

const SinglePractitioner = ({ id }: { id: string }) => {
    const { practitioner } = useSinglePractitioner(id)
    if (!practitioner) return null

    return (
        <>
            <HeaderArticle
                title={`${practitioner.firstName} ${practitioner.lastName}`}
            >
                <div className="flex gap-2 items-center">
                    <Phone size="12" />
                    {practitioner.phone}
                </div>
            </HeaderArticle>
            <ContentArticle>
                <PractitionerDetails practitionerId={id} />
                <div className="my-4"></div>
                <AppointmentSelector practitionerId={id} />
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SinglePractitioner
