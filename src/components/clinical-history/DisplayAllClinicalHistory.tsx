import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { usePatientContext } from '@/hooks/usePatientContext'
import { transformDate } from '@/lib/utils'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogOverlay,
    DialogTrigger,
} from '@/components/ui/base/dialog'
import DisplaySingleClinicalHistory from '@components/clinical-history/DisplaySingleClinicalHistory'

const DisplayAllClinicalHistory = () => {
    const [openModal, setOpenModal] = useState<string | null>(null)
    const { clinicalHistory } = usePatientContext()

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">Clinical History</h2>
                </CardTitle>
            </CardHeader>

            <CardContent>
                {clinicalHistory?.map((item) => {
                    const isModalOpen = openModal === item.id

                    return (
                        <div key={uuidv4()}>
                            <Dialog
                                key={item.id}
                                open={isModalOpen}
                                onOpenChange={(open) =>
                                    setOpenModal(open ? item.id : null)
                                }
                            >
                                <h3 className="my-3">
                                    {item?.created_at && (
                                        <DialogTrigger>
                                            {transformDate(item.created_at)} -{' '}
                                            {item.medical_diagnosis?.[0]
                                                ?.diagnosis || 'No diagnosis'}
                                        </DialogTrigger>
                                    )}
                                </h3>
                                <DialogOverlay className="bg-black/60" />
                                <DialogContent className="sm:max-w-6xl top-0 translate-y-0 dark:bg-black">
                                    <DialogHeader className="sr-only">
                                        <DialogTitle>
                                            {item?.created_at ? (
                                                <>
                                                    {transformDate(
                                                        item.created_at
                                                    )}
                                                    -{' '}
                                                    {item.medical_diagnosis?.[0]
                                                        ?.diagnosis ||
                                                        'No diagnosis'}
                                                </>
                                            ) : (
                                                <>'No'</>
                                            )}
                                        </DialogTitle>
                                        <DialogDescription>
                                            A single clinical history
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DisplaySingleClinicalHistory item={item} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default DisplayAllClinicalHistory
