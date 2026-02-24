import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
} from '@shared/components/ui/base/drawer'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@shared/components/ui/base/table'
import { useEncounterList } from '@workflows/clinical-encounter/hooks/useEncounterList'
import ReadClinicalEncounter from './ReadClinicalEncounter'
import AddClinicalEncounter from './AddClinicalEncounter'
import content from './EncounterList.content'

const EncounterList = ({ patientId }: { patientId: string }) => {
    const { items, loading, error } = useEncounterList(patientId)
    const [selectedEncounterId, setSelectedEncounterId] = useState<
        string | null
    >(null)

    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)

    if (loading) {
        return <p className="text-sm text-gray-500">{content.textLoading}</p>
    }

    if (error) {
        return <p className="text-sm text-red-500">{content.textError}</p>
    }

    if (items.length === 0) {
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{content.headerDate}</TableHead>
                                <TableHead>{content.headerCondition}</TableHead>
                                <TableHead>{content.headerActions}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map(({ encounter, condition }) => {
                                const date = encounter.period?.start
                                    ? new Date(
                                          encounter.period.start
                                      ).toLocaleDateString()
                                    : '-'
                                const conditionName =
                                    condition?.code?.text ??
                                    content.textNoCondition

                                return (
                                    <TableRow key={encounter.id}>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>{conditionName}</TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setSelectedEncounterId(
                                                        encounter.id ?? null
                                                    )
                                                }
                                            >
                                                <ChevronRight size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Drawer
                open={selectedEncounterId !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedEncounterId(null)
                }}
            >
                <DrawerOverlay className="bg-black/60" />
                <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[90vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                    <DrawerHeader className="sr-only">
                        <DrawerTitle>{content.textReadEncounter}</DrawerTitle>
                        <DrawerDescription>
                            {content.textReadEncounter}
                        </DrawerDescription>
                    </DrawerHeader>
                    {selectedEncounterId && (
                        <ReadClinicalEncounter
                            encounterId={selectedEncounterId}
                        />
                    )}
                </DrawerContent>
            </Drawer>

            <Drawer open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
                <DrawerOverlay className="bg-black/60" />
                <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[90vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                    <DrawerHeader className="sr-only">
                        <DrawerTitle>{content.textAddDrawerTitle}</DrawerTitle>
                        <DrawerDescription>
                            {content.textAddDrawerDescription}
                        </DrawerDescription>
                    </DrawerHeader>
                    <AddClinicalEncounter
                        patientId={patientId}
                        onSuccess={() => setIsAddDrawerOpen(false)}
                    />
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default EncounterList
