import { useState } from 'react'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
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
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
} from '@shared/components/ui/base/drawer'
import { Badge } from '@shared/components/ui/base/badge'
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
                    <ul className="space-y-2">
                        {allergyIntolerances.map((allergy) => (
                            <li
                                key={allergy.id}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                                onClick={() => setSelectedAllergyId(allergy.id)}
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

            <Drawer open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
                <DrawerOverlay className="bg-black/60" />
                <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[98vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                    <DrawerHeader className="sr-only">
                        <DrawerTitle>{content.textAddDrawerTitle}</DrawerTitle>
                        <DrawerDescription className="sr-only">
                            {content.textAddDrawerDescription}
                        </DrawerDescription>
                    </DrawerHeader>
                    <AllergyIntoleranceForm
                        patientId={patientId}
                        mode="create"
                        onSuccess={() => setIsAddDrawerOpen(false)}
                    />
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AllergyIntoleranceList
