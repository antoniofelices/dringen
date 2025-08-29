// import { usePatientContext } from '@/hooks/usePatientContext'
import type { ClinicalHistoryWithDiagnosis } from '@/types/interfaces'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/base/tabs'

import DisplayDiagnosis from '@components/clinical-history/DisplayDiagnosis'
import DisplayExamination from '@components/clinical-history/DisplayExamination'
import DisplayExaminationData from '@components/clinical-history/DisplayExaminationData'

const DisplayAllClinicalHistory = ({
    item,
}: {
    item: ClinicalHistoryWithDiagnosis
}) => {
    return (
        <Tabs aria-label="Clinical history" defaultValue="examination">
            <TabsList>
                <TabsTrigger value="examination">Examination</TabsTrigger>
                <TabsTrigger value="examination-data">
                    Examination Data
                </TabsTrigger>
                <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                <TabsTrigger value="aditional-tests">
                    Aditional Tests
                </TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
            </TabsList>
            <div className="mt-4">
                <TabsContent value="examination">
                    <DisplayExamination item={item} />
                </TabsContent>
                <TabsContent value="examination-data">
                    <DisplayExaminationData item={item} />
                </TabsContent>
                <TabsContent value="diagnosis">
                    <DisplayDiagnosis item={item} />
                </TabsContent>
                <TabsContent value="aditional-tests">
                    <p>{item.additional_tests}</p>
                </TabsContent>

                <TabsContent value="treatment">
                    <p>{item.treatment}</p>
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default DisplayAllClinicalHistory
