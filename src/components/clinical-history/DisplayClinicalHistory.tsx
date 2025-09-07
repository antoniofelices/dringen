import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Maximize } from 'lucide-react'
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
import content from '@data/clinical-history/displayClinicalHistory'

const DisplayClinicalHistory = () => {
    const [openModal, setOpenModal] = useState<string | null>(null)
    const { clinicalHistory } = usePatientContext()
    const orderClinicalHistory = clinicalHistory?.toSorted((a, b) => {
        const dateA = new Date(a.created_at ?? '').getTime()
        const dateB = new Date(b.created_at ?? '').getTime()
        return dateB - dateA
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
            </CardHeader>

            <CardContent>
                {orderClinicalHistory?.map((item) => {
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
                                <h3 className="my-4 border-b-2 pb-4">
                                    {item?.created_at && (
                                        <DialogTrigger className="flex justify-between w-full">
                                            <div>
                                                {transformDate(item.created_at)}{' '}
                                                -{' '}
                                                {item.medical_diagnosis?.[0]
                                                    ?.diagnosis ||
                                                    content.textNoDiagnosis}
                                            </div>
                                            <Maximize size={12} />
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
                                                        content.textNoDiagnosis}
                                                </>
                                            ) : (
                                                <>'No'</>
                                            )}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {content.textDescription}
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

export default DisplayClinicalHistory
