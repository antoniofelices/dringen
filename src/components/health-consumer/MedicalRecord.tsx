import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

import Diagnosis from '@components/health-consumer/Diagnosis'
import Examination from '@components/health-consumer/Examination'
import ExaminationData from '@components/health-consumer/ExaminationData'
import { transformDate } from '@helpers/utils'

const MedicalRecord = ({ content }: { content: any }) => {
    const [openModal, setOpenModal] = useState<string | null>(null)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">Previous revisions</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {content.dn_hpi.map((item: any) => {
                    const isModalOpen = openModal === item.id

                    return (
                        <Dialog
                            key={item.id}
                            open={isModalOpen}
                            onOpenChange={() => setOpenModal(item.id)}
                        >
                            <h3 className="my-3">
                                <DialogTrigger>
                                    {transformDate(item.date_of)} - CERTAINTY:
                                    DIAGNOSIS
                                </DialogTrigger>
                            </h3>
                            <DialogContent className="sm:max-w-6xl">
                                <DialogHeader className="sr-only">
                                    <DialogTitle>
                                        {transformDate(item.date_of)} -
                                        CERTAINTY: DIAGNOSIS
                                    </DialogTitle>
                                    <DialogDescription>
                                        A single review
                                    </DialogDescription>
                                </DialogHeader>
                                <Tabs
                                    aria-label="Previous revision"
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
                                    <TabsContent value="examination">
                                        <Examination content={item} />
                                    </TabsContent>
                                    <TabsContent value="examination-Data">
                                        <ExaminationData content={item} />
                                    </TabsContent>
                                    <TabsContent value="diagnosis">
                                        <Diagnosis id={item.id} />
                                    </TabsContent>
                                    <TabsContent value="aditional-tests">
                                        <p>{item.additional_tests}</p>
                                    </TabsContent>
                                    <TabsContent value="treatment">
                                        <p>{item.treatment}</p>
                                    </TabsContent>
                                </Tabs>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default MedicalRecord
