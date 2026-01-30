import type { ClinicalHistoryWithDiagnosisType } from '@/types/interfaces'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/base/tabs'
import DisplayDiagnosis from '@components/clinical-history/DisplayDiagnosis'
import DisplayExamination from '@components/clinical-history/DisplayExamination'
import DisplayExaminationData from '@components/clinical-history/DisplayExaminationData'
import content from '@data/clinical-history/displaySingleClinicalHistory'

const DisplayAllClinicalHistory = ({
    item,
}: {
    item: ClinicalHistoryWithDiagnosisType
}) => {
    return (
        <Tabs aria-label="Clinical history" defaultValue="examination">
            <TabsList>
                <TabsTrigger value="examination">
                    {content.textExamination}
                </TabsTrigger>
                <TabsTrigger value="examination-data">
                    {content.textExaminationData}
                </TabsTrigger>
                <TabsTrigger value="diagnosis">
                    {content.textDiagnosis}
                </TabsTrigger>
                <TabsTrigger value="aditional-tests">
                    {content.textAditionalTests}
                </TabsTrigger>
                <TabsTrigger value="treatment">
                    {content.textTreatment}
                </TabsTrigger>
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
