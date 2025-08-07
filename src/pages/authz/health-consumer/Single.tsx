import { useQuery } from '@tanstack/react-query'
import Loading from '@components/base/Loading'
import ErrorApi from '@components/base/ErrorApi'
import ButtonBack from '@components/base/ButtonBack'
import MedicalRecord from '@/components/health-consumer/MedicalRecord'
import Info from '@components/health-consumer/Info'
import Pfsh from '@/components/health-consumer/Pfsh'

import { getSingleHealthConsumer } from '@/services/supabaseService'

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

const Single = ({ id }: { id: string }) => {
    const {
        data: personData,
        isPending: personLoading,
        isError: personError,
        error: personErrorType,
    } = useQuery({
        queryKey: ['singlePerson', id],
        queryFn: () => getSingleHealthConsumer(id),
    })

    if (personLoading) return <Loading />

    if (personError && personErrorType)
        return <ErrorApi message={personErrorType.message} />

    const pfsh = personData.dn_pfsh[0]

    return (
        <>
            <article>
                <Drawer>
                    <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                        <div className="col-span-6 mt-6">
                            <div className="flex justify-between items-center">
                                <h1 className="font-extrabold text-xl">
                                    {personData.user_name}{' '}
                                    {personData.user_last_name}
                                </h1>
                                <DrawerTrigger>
                                    Add History of Present Illness
                                </DrawerTrigger>
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
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>
                                    History of Present Illness
                                </DrawerTitle>
                                <DrawerDescription>
                                    A History of Present Illness form
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="">Form infinito!</div>
                        </DrawerContent>
                    </div>
                </Drawer>
            </article>
            <ButtonBack />
        </>
    )
}

export default Single
