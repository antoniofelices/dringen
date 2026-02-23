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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@shared/components/ui/base/table'
import { useFamilyMemberHistoryList } from '@resources/family-member-history/hooks/useFamilyMemberHistory'
import FamilyMemberHistoryDetail from './FamilyMemberHistoryDetail'
import FamilyMemberHistoryForm from './FamilyMemberHistoryForm'
import content from './FamilyMemberHistoryList.content'

const statusColor: Record<string, string> = {
    completed: 'text-green-400',
    partial: 'text-yellow-400',
    'health-unknown': 'text-gray-400',
    'entered-in-error': 'text-red-400',
}

const statusDotColor: Record<string, string> = {
    completed: 'bg-green-400',
    partial: 'bg-yellow-400',
    'health-unknown': 'bg-gray-400',
    'entered-in-error': 'bg-red-400',
}

const FamilyMemberHistoryList = ({ patientId }: { patientId: string }) => {
    const { familyMemberHistories, isPending, isError } =
        useFamilyMemberHistoryList(patientId)
    const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
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
                    {!familyMemberHistories ||
                    familyMemberHistories.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            {content.textEmpty}
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        {content.headerRelationship}
                                    </TableHead>
                                    <TableHead>
                                        {content.headerCondition}
                                    </TableHead>
                                    <TableHead>
                                        {content.headerStatus}
                                    </TableHead>
                                    <TableHead>
                                        {content.headerActions}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {familyMemberHistories.map((history) => (
                                    <TableRow key={history.id}>
                                        <TableCell>
                                            {history.relationship}
                                        </TableCell>
                                        <TableCell>
                                            {history.condition}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-xs ${statusColor[history.status] ?? 'text-gray-400'}`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDotColor[history.status] ?? 'bg-gray-400'}`}
                                                />
                                                {history.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setSelectedHistoryId(
                                                        history.id
                                                    )
                                                }
                                            >
                                                <ChevronRight size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={selectedHistoryId !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedHistoryId(null)
                }}
            >
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{content.textDialogTitle}</DialogTitle>
                        <DialogDescription className="sr-only">
                            {content.textDialogDescription}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedHistoryId && (
                        <FamilyMemberHistoryDetail
                            historyId={selectedHistoryId}
                            patientId={patientId}
                            onSuccess={() => setSelectedHistoryId(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Drawer
                open={isAddDrawerOpen}
                onOpenChange={setIsAddDrawerOpen}
            >
                <DrawerOverlay className="bg-black/60" />
                <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[80vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                    <DrawerHeader>
                        <DrawerTitle>
                            {content.textAddDrawerTitle}
                        </DrawerTitle>
                        <DrawerDescription className="sr-only">
                            {content.textAddDrawerDescription}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        <FamilyMemberHistoryForm
                            patientId={patientId}
                            mode="create"
                            onSuccess={() => setIsAddDrawerOpen(false)}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default FamilyMemberHistoryList
