import { useState } from 'react'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import { Badge } from '@shared/components/ui/base/badge'
import DrawerWrapper from '@/shared/components/ui/DrawerWrapper'
import { useAllergyIntoleranceList } from '@resources/allergy-intolerance/hooks/useAllergyIntolerance'
import AllergyIntoleranceDetail from './AllergyIntoleranceDetail'
import AllergyIntoleranceForm from './AllergyIntoleranceForm'
import { criticalityColor } from '@resources/allergy-intolerance/presentation/AllergyIntoleranceList.colors'
import content from './AllergyIntoleranceList.content'

const AllergyIntoleranceList = ({ patientId }: { patientId: string }) => {
    const { allergyIntolerances, isPending, isError } =
        useAllergyIntoleranceList(patientId)
    const [selectedAllergyId, setSelectedAllergyId] = useState<string | null>(
        null
    )

    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)

    if (isPending) {
        return <p className="text-sm text-gray-500">{content.textLoading}</p>
    }

    if (isError) {
        return <p className="text-sm text-red-500">{content.textError}</p>
    }

    return (
        <>
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-extrabold">{content.title}</h2>
                    </CardTitle>
                    <CardAction>
                        <Button
                            size="xs"
                            variant="outline"
                            onClick={() => setIsAddDrawerOpen(true)}
                        >
                            {content.textButtonAdd}
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {!allergyIntolerances ||
                    allergyIntolerances.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            {content.textEmpty}
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {allergyIntolerances.map((allergy) => (
                                <li
                                    key={allergy.id}
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                                    onClick={() =>
                                        setSelectedAllergyId(allergy.id)
                                    }
                                >
                                    <span
                                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                            criticalityColor[
                                                allergy.criticality
                                            ] ?? 'bg-gray-300'
                                        }`}
                                    />
                                    <span className="font-medium text-sm flex-1">
                                        {allergy.substance}
                                    </span>
                                    {allergy.category && (
                                        <Badge variant="secondary">
                                            {allergy.category}
                                        </Badge>
                                    )}
                                    {allergy.criticality && (
                                        <Badge variant="outline">
                                            {allergy.criticality}
                                        </Badge>
                                    )}
                                    {allergy.clinicalStatus && (
                                        <Badge variant="outline">
                                            {allergy.clinicalStatus}
                                        </Badge>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>

            <DrawerWrapper
                open={selectedAllergyId !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedAllergyId(null)
                }}
                title={content.textDialogTitle}
                description={content.textDialogDescription}
            >
                {selectedAllergyId && (
                    <AllergyIntoleranceDetail
                        allergyId={selectedAllergyId}
                        patientId={patientId}
                        onSuccess={() => setSelectedAllergyId(null)}
                    />
                )}
            </DrawerWrapper>

            <DrawerWrapper
                open={isAddDrawerOpen}
                onOpenChange={setIsAddDrawerOpen}
                title={content.textAddDrawerTitle}
                description={content.textAddDrawerDescription}
            >
                <AllergyIntoleranceForm
                    patientId={patientId}
                    mode="create"
                    onSuccess={() => setIsAddDrawerOpen(false)}
                />
            </DrawerWrapper>
        </>
    )
}

export default AllergyIntoleranceList
