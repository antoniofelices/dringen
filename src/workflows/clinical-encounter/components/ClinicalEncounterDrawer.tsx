import {
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
} from '@shared/components/ui/base/drawer'
import AddClinicalEncounter from '@workflows/clinical-encounter/components/AddClinicalEncounter'
import content from './ClinicalEncounterDrawer.content'

type Props = {
    patientId: string
    onSuccess?: () => void
}

const ClinicalEncounterDrawer = ({ patientId, onSuccess }: Props) => {
    return (
        <>
            <DrawerOverlay className="bg-black/60" />
            <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[80vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                <DrawerHeader className="sr-only">
                    <DrawerTitle>{content.textPresentIllness}</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        {content.textPresentIllnessForm}
                    </DrawerDescription>
                </DrawerHeader>
                <AddClinicalEncounter
                    patientId={patientId}
                    onSuccess={onSuccess}
                />
            </DrawerContent>
        </>
    )
}

export default ClinicalEncounterDrawer
