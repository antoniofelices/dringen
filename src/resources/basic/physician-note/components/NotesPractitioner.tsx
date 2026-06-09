import { CircleX } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
} from '@shared/components/ui/base/item'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@shared/components/ui/base/dialog'
import { Textarea } from '@shared/components/ui/base/textarea'
import { useNotesPractitioner } from '@resources/basic/physician-note/hooks/useNotesPractitioner'
import Loading from '@shared/components/ui/Loading'
import ErrorApi from '@shared/components/ui/ErrorApi'
import { contentES as content } from './NotesPractitioner.content'

const NotesPractitioner = ({ practitionerId }: { practitionerId: string }) => {
    const {
        notes,
        isPending,
        isError,
        error,
        editingId,
        editText,
        setEditText,
        handleNoteClick,
        handleEditBlur,
        handleEditKeyDown,
        handleDelete,
        isAddOpen,
        setIsAddOpen,
        newNoteText,
        setNewNoteText,
        handleSave,
        handleNewNoteKeyDown,
        handleCancel,
        isCreating,
    } = useNotesPractitioner(practitionerId)

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="font-bold text-gray-700 dark:text-gray-300">{content.title}</h2>
                    </CardTitle>
                    <CardAction>
                        <Button
                            size="xs"
                            variant="outline"
                            onClick={() => setIsAddOpen(true)}
                        >
                            {content.textButtonEdit}
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {notes.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            {content.textEmpty}
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {notes.map((note) => (
                                <Item key={note.id}>
                                    <ItemContent>
                                        {editingId === note.id ? (
                                            <Textarea
                                                value={editText}
                                                onChange={(e) =>
                                                    setEditText(e.target.value)
                                                }
                                                onBlur={() =>
                                                    handleEditBlur(note.id)
                                                }
                                                onKeyDown={(e) =>
                                                    handleEditKeyDown(e, note.id)
                                                }
                                                autoFocus
                                                className="text-sm"
                                            />
                                        ) : (
                                            <ItemTitle
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    handleNoteClick(
                                                        note.id,
                                                        note.text
                                                    )
                                                }
                                            >
                                                {note.text}
                                            </ItemTitle>
                                        )}
                                    </ItemContent>
                                    <ItemActions>
                                        <button
                                            onClick={() =>
                                                handleDelete(note.id)
                                            }
                                        >
                                            <CircleX size="20" />
                                        </button>
                                    </ItemActions>
                                </Item>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{content.textDialogTitle}</DialogTitle>
                    </DialogHeader>
                    <Textarea
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        onKeyDown={handleNewNoteKeyDown}
                        placeholder={content.textDialogPlaceholder}
                        rows={4}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel}>
                            {content.textButtonCancel}
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={!newNoteText.trim() || isCreating}
                        >
                            {content.textButtonSave}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NotesPractitioner
