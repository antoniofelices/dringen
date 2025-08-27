import { useQuery } from '@tanstack/react-query'
import { getSingleHealthConsumer } from '@/services/supabaseService'
import { Button } from '@/components/ui/base/button'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/base/drawer'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ErrorApi from '@components/ui/ErrorApi'
import Loading from '@components/ui/Loading'
import AddHpi from '@/components/health-consumer/AddHpi'
import Info from '@components/health-consumer/Info'
import MedicalRecord from '@/components/health-consumer/MedicalRecord'
import Pfsh from '@/components/health-consumer/Pfsh'

const SingleHealthConsumer = ({ id }: { id: string }) => {
    const {
        data: personData,
        isPending: personLoading,
        isError: personError,
        error: personErrorType,
    } = useQuery({
        queryKey: ['singleHealthConsumerQuery', id],
        queryFn: () => getSingleHealthConsumer(id),
    })

    if (personLoading) return <Loading />

    if (personError && personErrorType)
        return <ErrorApi message={personErrorType.message} />

    const pfsh = personData.medical_patient_history

    return (
        <Drawer>
            <HeaderArticle
                title={`${personData.user_name} ${personData.user_last_name}`}
            >
                <Button asChild size="sm">
                    <DrawerTrigger>
                        Add History of Present Illness
                    </DrawerTrigger>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        <div>
                            <Info content={personData} />
                        </div>
                        <div className="mt-6">
                            <Pfsh contentPfsh={pfsh} />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <MedicalRecord content={personData} />
                    </div>
                    <DrawerOverlay className="bg-black/60" />
                    <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[80vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                        <DrawerHeader className="sr-only">
                            <DrawerTitle>
                                History of Present Illness
                            </DrawerTitle>
                            <DrawerDescription className="sr-only">
                                A History of Present Illness form
                            </DrawerDescription>
                        </DrawerHeader>
                        <AddHpi />
                    </DrawerContent>
                </div>
            </ContentArticle>
            <ButtonBack />
        </Drawer>
    )
}

export default SingleHealthConsumer
