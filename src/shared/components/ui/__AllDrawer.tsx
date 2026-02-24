import {
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
} from '@shared/components/ui/base/drawer'
import AllergyIntoleranceForm from './AllergyIntoleranceForm'
import content from './__AllDrawer.content'

type Props = {
    patientId: string
    onSuccess: () => void
}

const AllDrawer = ({ patientId, onSuccess }: Props) => {
    return (
        <>
            <DrawerOverlay className="bg-black/60" />
            <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[98vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                <DrawerHeader className="sr-only">
                    <DrawerTitle>{content.title}</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        {content.description}
                    </DrawerDescription>
                </DrawerHeader>
                <AllergyIntoleranceForm
                    patientId={patientId}
                    mode="create"
                    onSuccess={onSuccess}
                />
            </DrawerContent>
        </>
    )
}

export default AllDrawer
