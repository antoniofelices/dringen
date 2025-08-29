import { usePatientContext } from '@/hooks/usePatientContext'
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
import DisplayAllClinicalHistory from '@/components/clinical-history/DisplayAllClinicalHistory'
import PatientHistoryP from '@components/patient/PatientHistory'
import content from '@/config/data/pages/singleUser'

const SinglePatient = () => {
    const {
        patientData,
        clinicalHistory,
        patientLoading,
        patientError,
        patientErrorType,
    } = usePatientContext()

    if (patientLoading) return <Loading />

    if (patientError && patientErrorType)
        return <ErrorApi message={patientErrorType.message} />

    return (
        <Drawer>
            <HeaderArticle
                title={`${patientData?.user_name} ${patientData?.user_last_name}`}
            >
                <Button asChild size="sm">
                    <DrawerTrigger>
                        {content.textButtonAddClinicalHistory}
                    </DrawerTrigger>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        <PatientGeneralData />
                    </div>
                    <div className="col-span-3">
                        <PatientHistoryP />
                    </div>
                    {clinicalHistory?.[0] && (
                        <div className="col-span-6">
                            <DisplayAllClinicalHistory />
                        </div>
                    )}

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
                        <AddClinicalHistory />
                    </DrawerContent>
                </div>
            </ContentArticle>
            <ButtonBack />
        </Drawer>
    )
}

export default SinglePatient
