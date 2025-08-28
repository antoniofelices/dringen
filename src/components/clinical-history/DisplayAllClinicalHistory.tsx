import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/base/tabs'

import DisplayDiagnosis from '@components/clinical-history/DisplayDiagnosis'
import DisplayExamination from '@components/clinical-history/DisplayExamination'
import DisplayExaminationData from '@components/clinical-history/DisplayExaminationData'

const DisplayAllClinicalHistory = ({ content }: { content: any }) => {
    const [openModal, setOpenModal] = useState<string | null>(null)

    console.log(content)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">Clinical History</h2>
                </CardTitle>
            </CardHeader>

            <CardContent>
                {content.medical_clinical_history.map((item: any) => {
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
                                    <DialogTrigger>
                                        {transformDate(item.created_at)} -{' '}
                                        {item.medical_diagnosis[0].diagnosis}
                                    </DialogTrigger>
                                </h3>
                                <DialogOverlay className="bg-black/60" />
                                <DialogContent className="sm:max-w-6xl top-0 translate-y-0 dark:bg-black">
                                    <DialogHeader className="sr-only">
                                        <DialogTitle>
                                            {transformDate(item.created_at)} -{' '}
                                            {
                                                item.medical_diagnosis[0]
                                                    .diagnosis
                                            }
                                        </DialogTitle>
                                        <DialogDescription>
                                            A single review
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Tabs
                                        aria-label="Clinical history"
                                        defaultValue="examination"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="examination">
                                                Examination
                                            </TabsTrigger>
                                            <TabsTrigger value="examination-data">
                                                Examination Data
                                            </TabsTrigger>
                                            <TabsTrigger value="diagnosis">
                                                Diagnosis
                                            </TabsTrigger>
                                            <TabsTrigger value="aditional-tests">
                                                Aditional Tests
                                            </TabsTrigger>
                                            <TabsTrigger value="treatment">
                                                Treatment
                                            </TabsTrigger>
                                        </TabsList>
                                        <div className="mt-4">
                                            <TabsContent value="examination">
                                                <DisplayExamination
                                                    content={item}
                                                />
                                            </TabsContent>
                                            <TabsContent value="examination-data">
                                                <DisplayExaminationData
                                                    content={item}
                                                />
                                            </TabsContent>
                                            <TabsContent value="diagnosis">
                                                <DisplayDiagnosis
                                                    id={item.id}
                                                />
                                            </TabsContent>
                                            <TabsContent value="aditional-tests">
                                                <p>{item.additional_tests}</p>
                                            </TabsContent>
                                            <TabsContent value="treatment">
                                                <p>{item.treatment}</p>
                                            </TabsContent>
                                        </div>
                                    </Tabs>
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
