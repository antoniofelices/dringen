import { useQuery } from '@tanstack/react-query'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'
import ButtonBack from '@components/ui/ButtonBack'
import MedicalRecord from '@/components/health-consumer/MedicalRecord'
import Info from '@components/health-consumer/Info'
import Pfsh from '@/components/health-consumer/Pfsh'
import AddHpi from '@/components/health-consumer/AddHpi'

import { getSingleHealthConsumer } from '@/services/supabaseService'

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/base/drawer'

import { Button } from '@/components/ui/base/button'

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

    const pfsh = personData.dn_pfsh[0]

    return (
        <>
            <Drawer>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-6 mt-6">
                        <div className="flex justify-between items-center">
                            <h1 className="font-extrabold text-xl">
                                {personData.user_name}{' '}
                                {personData.user_last_name}
                            </h1>
                            <Button asChild size="sm">
                                <DrawerTrigger>
                                    Add History of Present Illness
                                </DrawerTrigger>
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div>
                            <Info content={personData} />
                        </div>
                        <div className="mt-6">
                            <Pfsh content={pfsh} />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <MedicalRecord content={personData} />
                    </div>
                    <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[80vh]">
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
            </Drawer>
            <ButtonBack />
        </>
    )
}

export default SingleHealthConsumer
