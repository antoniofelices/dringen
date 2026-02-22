import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
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
import content from './EncounterList.content'

const EncounterList = ({ patientId }: { patientId: string }) => {
    const { items, loading, error } = useEncounterList(patientId)
    const [selectedEncounterId, setSelectedEncounterId] = useState<
        string | null
    >(null)

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

            <Dialog
                open={selectedEncounterId !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedEncounterId(null)
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{content.textReadEncounter}</DialogTitle>
                        <DialogDescription className="sr-only">
                            {content.textReadEncounter}
                        </DialogDescription>
                    </DialogHeader>
                    <ReadClinicalEncounter />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EncounterList
