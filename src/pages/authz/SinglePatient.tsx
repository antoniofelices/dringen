import { useState } from 'react'
import { usePatientContext } from '@hooks/usePatientContext'
import { useDataWeight, useDataBMI } from '@hooks/usePatientMetrics'
import RoleGuard from '@components/RoleGuard'
import { Button } from '@components/ui/base/button'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
} from '@components/ui/base/drawer'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@components/ui/ContentArticle'
import HeaderArticle from '@components/ui/HeaderArticle'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import AddClinicalHistory from '@components/clinical-history/AddClinicalHistory'
import PatientGeneralData from '@components/patient/PatientGeneralData'
import DisplayClinicalHistory from '@/components/clinical-history/DisplayClinicalHistory'
import PatientHistory from '@components/patient/PatientHistory'
import PatientWeightChart from '@components/patient/PatientWeightChart'
import PatientBMIChart from '@components/patient/PatientBMIChart'
import content from '@/config/data/pages/singlePatient'

const SinglePatient = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const {
        patientData,
        clinicalHistory,
        patientLoading,
        patientError,
        patientErrorType,
        refetchPatient,
    } = usePatientContext()

    const patientDataWeight = useDataWeight()
    const patientDataBMI = useDataBMI()

    if (patientLoading) return <Loading />

    if (patientError && patientErrorType)
        return <ErrorApi message={patientErrorType.message} />

    const handleFormSuccess = () => {
        setIsDrawerOpen(false)
        refetchPatient()
    }

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <HeaderArticle
                title={`${patientData?.user_name} ${patientData?.user_last_name}`}
            >
                <RoleGuard allowedRoles={['admin', 'physician']}>
                    <Button asChild size="sm">
                        <DrawerTrigger>
                            {content.textButtonAddClinicalHistory}
                        </DrawerTrigger>
                    </Button>
                </RoleGuard>
            </HeaderArticle>
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        <PatientGeneralData />
                    </div>
                    <RoleGuard allowedRoles={['admin', 'physician']}>
                        <div className="col-span-3">
                            <PatientHistory />
                        </div>
                        {clinicalHistory?.[0] && (
                            <div className="col-span-6">
                                <DisplayClinicalHistory />
                            </div>
                        )}
                        {patientDataWeight?.[1] && (
                            <div className="col-span-3">
                                <PatientWeightChart />
                            </div>
                        )}
                        {patientDataBMI?.[1] && (
                            <div className="col-span-3">
                                <PatientBMIChart />
                            </div>
                        )}
                    </RoleGuard>
                    <DrawerOverlay className="bg-black/60" />
                    <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[80vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                        <DrawerHeader className="sr-only">
                            <DrawerTitle>
                                {content.textPresentIllnes}
                            </DrawerTitle>
                            <DrawerDescription className="sr-only">
                                {content.textPesentIllnesForm}
                            </DrawerDescription>
                        </DrawerHeader>
                        <AddClinicalHistory onSuccess={handleFormSuccess} />
                    </DrawerContent>
                </div>
            </ContentArticle>
            <ButtonBack />
        </Drawer>
    )
}

export default SinglePatient
