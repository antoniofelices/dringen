import { useQuery } from '@tanstack/react-query'
import { getSinglePatient } from '@services/supabaseService'
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
import PatientHistory from '@components/patient/PatientHistory'
import content from '@/config/data/pages/singleUser'

const SinglePatient = ({ id }: { id: string }) => {
    const {
        data: patientData,
        isPending: personLoading,
        isError: personError,
        error: personErrorType,
    } = useQuery({
        queryKey: ['singleHealthConsumerQuery', id],
        queryFn: () => getSinglePatient(id),
    })

    if (personLoading) return <Loading />

    if (personError && personErrorType)
        return <ErrorApi message={personErrorType.message} />

    const pfsh = patientData.medical_patient_history

    return (
        <Drawer>
            <HeaderArticle
                title={`${patientData.user_name} ${patientData.user_last_name}`}
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
                        <PatientGeneralData
                            contentPatientGeneralData={patientData}
                        />
                    </div>
                    <div className="col-span-3">
                        <PatientHistory contentPatientHistory={pfsh} />
                    </div>
                    <div className="col-span-6">
                        <DisplayAllClinicalHistory content={patientData} />
                    </div>
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
