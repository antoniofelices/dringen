import { useFamilyMemberHistory } from '@resources/family-member-history/hooks/useFamilyMemberHistory'
import DataDisplayList from '@shared/components/ui/DataDisplayList'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import FamilyMemberHistoryForm from './FamilyMemberHistoryForm'
import content from './FamilyMemberHistoryDetail.content'

type FamilyMemberHistoryDetailProps = {
    historyId: string
    patientId: string
    onSuccess: () => void
}

const FamilyMemberHistoryDetail = ({
    historyId,
    patientId,
    onSuccess,
}: FamilyMemberHistoryDetailProps) => {
    const { familyMemberHistory, isPending, isError } =
        useFamilyMemberHistory(historyId)

    if (isPending) {
        return <p className="text-sm text-gray-500">{content.textLoading}</p>
    }

    if (isError || !familyMemberHistory) {
        return <p className="text-sm text-red-500">{content.textError}</p>
    }

    const dataItems = [
        {
            label: content.labelRelationship,
            value: familyMemberHistory.relationship,
        },
        {
            label: content.labelCondition,
            value: familyMemberHistory.condition,
        },
        { label: content.labelStatus, value: familyMemberHistory.status },
        {
            label: content.labelDeceased,
            value: familyMemberHistory.deceasedBoolean
                ? content.textYes
                : content.textNo,
        },
        { label: content.labelNote, value: familyMemberHistory.note },
    ]

    return (
        <Tabs defaultValue="view">
            <TabsList>
                <TabsTrigger value="view">{content.tabView}</TabsTrigger>
                <TabsTrigger value="edit">{content.tabEdit}</TabsTrigger>
            </TabsList>
            <TabsContent value="view" className="mt-4">
                <DataDisplayList items={dataItems} />
            </TabsContent>
            <TabsContent value="edit" className="mt-4">
                <FamilyMemberHistoryForm
                    patientId={patientId}
                    historyData={familyMemberHistory}
                    mode="edit"
                    onSuccess={onSuccess}
                />
            </TabsContent>
        </Tabs>
    )
}

export default FamilyMemberHistoryDetail
