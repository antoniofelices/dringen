import { useState } from 'react'
import { Card, Modal, ModalBody } from 'flowbite-react'

import Diagnosis from '@components/health-consumer/Diagnosis'
import Examination from '@components/health-consumer/Examination'
import { transformDate } from '@helpers/utils'

const MedicalRecord = ({ content }: { content: any }) => {
    const [activeTabs, setActiveTabs] = useState({})
    const [openModal, setOpenModal] = useState<string | null>(null)

    const tabs = [
        { id: 'examination', label: 'Examination' },
        { id: 'diagnosis', label: 'Diagnosis' },
        { id: 'auxiliary', label: 'Auxiliary exams' },
        { id: 'treatments', label: 'Treatments' },
    ]

    const setActiveTab = (itemId: string, tabId: string) => {
        setActiveTabs((prev) => ({
            ...prev,
            [itemId]: tabId,
        }))
    }

    const getActiveTab = (itemId: string) => {
        return activeTabs[itemId] || 'examination'
    }

    const renderContent = (item: any, activeTab: string) => {
        switch (activeTab) {
            case 'examination':
                return <Examination content={item} />
            case 'diagnosis':
                return <Diagnosis id={item.id} />
            case 'auxiliary':
                return <p>{item.additional_tests}</p>
            case 'treatments':
                return <p>{item.treatment}</p>
            default:
                return null
        }
    }

    return (
        <Card>
            <h2 className="font-extrabold">Previous revisions</h2>

            {content.dn_hpi.map((item: any) => {
                const activeTab = getActiveTab(item.id)
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
                            className="min-h-dvh"
                        >
                            <ModalBody>
                                <div className="grid gap-4">
                                    <div className="menu-tabs mb-2 grid py-4 text-base lg:grid-cols-4">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() =>
                                                    setActiveTab(
                                                        item.id,
                                                        tab.id
                                                    )
                                                }
                                                className={`px-4 py-2 font-medium transition-colors ${
                                                    activeTab === tab.id
                                                        ? 'border-b-2 text-white bg-gray-800'
                                                        : 'text-gray-300 border-b hover:text-gray-800 hover:bg-gray-50'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="tab-content p-4 bg-gray-50 rounded-lg">
                                        {renderContent(item, activeTab)}
                                    </div>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                )
            })}
        </Card>
    )
}

export default MedicalRecord
