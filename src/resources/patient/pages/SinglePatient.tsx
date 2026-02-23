import { useState } from 'react'
import RoleGuard from '@auth/components/RoleGuard'
import { getAgeFromDate } from '@shared/utils/utils'
import { Button } from '@shared/components/ui/base/button'
import { Drawer, DrawerTrigger } from '@shared/components/ui/base/drawer'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import { useSinglePatient } from '@resources/patient/hooks/useGetPatient'
import PatientDemographics from '@resources/patient/components/PatientDemographics/PatientDemographics'
import AllergyIntoleranceList from '@resources/allergy-intolerance/components/AllergyIntoleranceList'
import AllergyIntoleranceDrawer from '@/resources/allergy-intolerance/components/AllergyIntoleranceDrawer'
import FamilyMemberHistoryList from '@resources/family-member-history/components/FamilyMemberHistoryList'
import {
    ClinicalEncounterDrawer,
    EncounterList,
} from '@workflows/clinical-encounter/index'
import content from './SinglePatient.content'

const SinglePatient = ({ id }: { id: string }) => {
    const { patient } = useSinglePatient(id)
    const [isEncounterDrawerOpen, setIsEncounterDrawerOpen] = useState(false)
    const [isAllergyDrawerOpen, setIsAllergyDrawerOpen] = useState(false)

    if (!patient) return null

    return (
        <>
            <HeaderArticle
                title={`${patient.firstName} - ${getAgeFromDate(patient.birthDate)} ${content.textYears}`}
            >
                <RoleGuard allowedRoles={['doctor']}>
                    <div>
                        <Drawer
                            open={isAllergyDrawerOpen}
                            onOpenChange={setIsAllergyDrawerOpen}
                        >
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="mr-4"
                            >
                                <DrawerTrigger>
                                    {content.textButtonAddAllergy}
                                </DrawerTrigger>
                            </Button>
                            <AllergyIntoleranceDrawer
                                patientId={id}
                                onSuccess={() => setIsAllergyDrawerOpen(false)}
                            />
                        </Drawer>
                        <Drawer
                            open={isEncounterDrawerOpen}
                            onOpenChange={setIsEncounterDrawerOpen}
                        >
                            <Button asChild size="sm">
                                <DrawerTrigger>
                                    {content.textButtonAddEncounter}
                                </DrawerTrigger>
                            </Button>
                            <ClinicalEncounterDrawer
                                patientId={id}
                                onSuccess={() =>
                                    setIsEncounterDrawerOpen(false)
                                }
                            />
                        </Drawer>
                    </div>
                </RoleGuard>
            </HeaderArticle>
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
                        <div className="col-span-6">Diagnostic Report</div>
                    </RoleGuard>
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default SinglePatient
