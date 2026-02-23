import { useState } from 'react'
import RoleGuard from '@auth/components/RoleGuard'
import { getAgeFromDate } from '@shared/utils/utils'
import { Button } from '@shared/components/ui/base/button'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
} from '@shared/components/ui/base/drawer'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@shared/components/ui/base/dialog'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import { useSinglePatient } from '@resources/patient/hooks/useGetPatient'
import PatientDemographics from '@resources/patient/components/PatientDemographics/PatientDemographics'
import AllergyIntoleranceList from '@resources/allergy-intolerance/components/AllergyIntoleranceList'
import AllergyIntoleranceForm from '@resources/allergy-intolerance/components/AllergyIntoleranceForm'
import content from './SinglePatient.content'

import ClinicalEncounter, {
    EncounterList,
} from '@workflows/clinical-encounter/index'

const SinglePatient = ({ id }: { id: string }) => {
    const { patient } = useSinglePatient(id)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isAllergyDialogOpen, setIsAllergyDialogOpen] = useState(false)

    if (!patient) return null

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <HeaderArticle
                title={`${patient.firstName} - ${getAgeFromDate(patient.birthDate)} ${content.textYears}`}
            >
                <RoleGuard allowedRoles={['doctor']}>
                    <Dialog
                        open={isAllergyDialogOpen}
                        onOpenChange={setIsAllergyDialogOpen}
                    >
                        <Button asChild size="sm" variant="outline">
                            <DialogTrigger>
                                {content.textButtonAddAllergy}
                            </DialogTrigger>
                        </Button>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {content.textAddAllergyTitle}
                                </DialogTitle>
                                <DialogDescription className="sr-only">
                                    {content.textAddAllergyDescription}
                                </DialogDescription>
                            </DialogHeader>
                            <AllergyIntoleranceForm
                                patientId={id}
                                mode="create"
                                onSuccess={() => setIsAllergyDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                    <Button asChild size="sm">
                        <DrawerTrigger>
                            {content.textButtonAddEncounter}
                        </DrawerTrigger>
                    </Button>
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
                        <div className="col-span-3">Family Member History</div>
                        <div className="col-span-6">
                            <EncounterList patientId={id} />
                        </div>
                        <div className="col-span-6">Diagnostic Report</div>
                    </RoleGuard>
                </div>
            </ContentArticle>
            <DrawerOverlay className="bg-black/60" />
            <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[80vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                <DrawerHeader className="sr-only">
                    <DrawerTitle>{content.textPresentIllnes}</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        {content.textPesentIllnesForm}
                    </DrawerDescription>
                </DrawerHeader>
                <ClinicalEncounter
                    patientId={id}
                    onSuccess={() => setIsDrawerOpen(false)}
                />
            </DrawerContent>
            <ButtonBack />
        </Drawer>
    )
}

export default SinglePatient
