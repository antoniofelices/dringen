import RoleGuard from '@auth/components/RoleGuard'
import { getAgeFromDate } from '@shared/utils/utils'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import { useSinglePatient } from '@resources/patient/hooks/useGetPatient'
import PatientDemographics from '@resources/patient/components/PatientDemographics/PatientDemographics'
import AllergyIntoleranceList from '@resources/allergy-intolerance/components/AllergyIntoleranceList'
import FamilyMemberHistoryList from '@resources/family-member-history/components/FamilyMemberHistoryList'
import { EncounterList } from '@workflows/clinical-encounter/index'
import content from './SinglePatient.content'

const SinglePatient = ({ id }: { id: string }) => {
    const { patient } = useSinglePatient(id)

    if (!patient) return null

    return (
        <>
            <HeaderArticle
                title={`${patient.firstName} - ${getAgeFromDate(patient.birthDate)} ${content.textYears}`}
            ></HeaderArticle>
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        <PatientDemographics patientData={patient} />
                    </div>
                    <RoleGuard allowedRoles={['doctor']}>
                        <div className="col-span-3">
                            <AllergyIntoleranceList patientId={id} />
                        </div>
                        <div className="col-span-3">
                            <FamilyMemberHistoryList patientId={id} />
                        </div>
                        <div className="col-span-3">
                            <EncounterList patientId={id} />
                        </div>
                    </RoleGuard>
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SinglePatient
