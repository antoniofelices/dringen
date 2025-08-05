import { useState } from 'react'
import { Card, Modal, ModalBody, TabItem, Tabs } from 'flowbite-react'

import Diagnosis from '@components/health-consumer/Diagnosis'
import Examination from '@components/health-consumer/Examination'
import ExaminationData from '@components/health-consumer/ExaminationData'
import { transformDate } from '@helpers/utils'

const MedicalRecord = ({ content }: { content: any }) => {
    const [openModal, setOpenModal] = useState<string | null>(null)

    return (
        <Card>
            <h2 className="font-extrabold">Previous revisions</h2>

            {content.dn_hpi.map((item: any) => {
                const isModalOpen = openModal === item.id

                return (
                    <div key={item.id}>
                        <button onClick={() => setOpenModal(item.id)}>
                            {transformDate(item.date_of)} - CERTAINTY: DIAGNOSIS
                        </button>
                        <Modal
                            show={isModalOpen}
                            onClose={() => setOpenModal(false)}
                            size="5xl"
                            dismissible
                            position="top-center"
                        >
                            <ModalBody>
                                <Tabs
                                    aria-label="Previous revision"
                                    variant="underline"
                                >
                                    <TabItem active title="Examination">
                                        <Examination content={item} />
                                    </TabItem>
                                    <TabItem active title="Examination Data">
                                        <ExaminationData content={item} />
                                    </TabItem>
                                    <TabItem title="Diagnosis">
                                        <Diagnosis id={item.id} />
                                    </TabItem>
                                    <TabItem title="Aditional Tests">
                                        <p>{item.additional_tests}</p>
                                    </TabItem>
                                    <TabItem title="Treatment">
                                        <p>{item.treatment}</p>
                                    </TabItem>
                                </Tabs>
                            </ModalBody>
                        </Modal>
                    </div>
                )
            })}
        </Card>
    )
}

export default MedicalRecord
