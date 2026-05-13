import { useAllergyIntolerance } from '@resources/allergy-intolerance/hooks/useAllergyIntolerance'
import DataDisplayList from '@shared/components/ui/DataDisplayList'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import AllergyIntoleranceForm from './AllergyIntoleranceForm'
import Loading from '@shared/components/ui/Loading'
import ErrorApi from '@shared/components/ui/ErrorApi'
import { buildDataItems } from './AllergyIntoleranceDetail.presenter'
import content from './AllergyIntoleranceDetail.content'

type AllergyIntoleranceDetailProps = {
    allergyId: string
    patientId: string
    onSuccess: () => void
}

const AllergyIntoleranceDetail = ({
    allergyId,
    patientId,
    onSuccess,
}: AllergyIntoleranceDetailProps) => {
    const { allergyIntolerance, isPending, isError, error } =
        useAllergyIntolerance(allergyId)

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />
    if (!allergyIntolerance) return null

    const dataItems = buildDataItems(allergyIntolerance)

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
                <AllergyIntoleranceForm
                    patientId={patientId}
                    allergyData={allergyIntolerance}
                    mode="edit"
                    onSuccess={onSuccess}
                />
            </TabsContent>
        </Tabs>
    )
}

export default AllergyIntoleranceDetail
