import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@shared/components/ui/base/dialog'
import { Badge } from '@shared/components/ui/base/badge'
import { useAllergyIntoleranceList } from '@resources/allergy-intolerance/hooks/useAllergyIntolerance'
import AllergyIntoleranceDetail from './AllergyIntoleranceDetail'
import content from './AllergyIntoleranceList.content'

const criticalityColor: Record<string, string> = {
    high: 'bg-red-500',
    low: 'bg-yellow-500',
    'unable-to-assess': 'bg-gray-400',
}

const AllergyIntoleranceList = ({ patientId }: { patientId: string }) => {
    const { allergyIntolerances, isPending, isError } =
        useAllergyIntoleranceList(patientId)
    const [selectedAllergyId, setSelectedAllergyId] = useState<string | null>(
        null
    )

    if (isPending) {
        return <p className="text-sm text-gray-500">{content.textLoading}</p>
    }

    if (isError) {
        return <p className="text-sm text-red-500">{content.textError}</p>
    }

    if (!allergyIntolerances || allergyIntolerances.length === 0) {
        return <p className="text-sm text-gray-500">{content.textEmpty}</p>
    }

    return (
        <>
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-extrabold">{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
                                        criticalityColor[allergy.criticality] ??
                                        'bg-gray-300'
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
                </CardContent>
            </Card>

            <Dialog
                open={selectedAllergyId !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedAllergyId(null)
                }}
            >
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{content.textDialogTitle}</DialogTitle>
                        <DialogDescription className="sr-only">
                            {content.textDialogDescription}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedAllergyId && (
                        <AllergyIntoleranceDetail
                            allergyId={selectedAllergyId}
                            patientId={patientId}
                            onSuccess={() => setSelectedAllergyId(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AllergyIntoleranceList
