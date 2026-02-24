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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@shared/components/ui/base/table'
import DrawerWrapper from '@/shared/components/ui/DrawerWrapper'
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
                    {items.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            {content.textEmpty}
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{content.headerDate}</TableHead>
                                    <TableHead>
                                        {content.headerCondition}
                                    </TableHead>
                                    <TableHead>
                                        {content.headerActions}
                                    </TableHead>
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
                                            <TableCell>
                                                {conditionName}
                                            </TableCell>
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
                    )}
                </CardContent>
            </Card>

            <DrawerWrapper
                open={selectedEncounterId !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedEncounterId(null)
                }}
                title={content.textReadEncounter}
                description={content.textReadEncounter}
            >
                {selectedEncounterId && (
                    <ReadClinicalEncounter encounterId={selectedEncounterId} />
                )}
            </DrawerWrapper>

            <DrawerWrapper
                open={isAddDrawerOpen}
                onOpenChange={setIsAddDrawerOpen}
                title={content.textAddDrawerTitle}
                description={content.textAddDrawerDescription}
            >
                <AddClinicalEncounter
                    patientId={patientId}
                    onSuccess={() => setIsAddDrawerOpen(false)}
                />
            </DrawerWrapper>
        </>
    )
}

export default EncounterList
