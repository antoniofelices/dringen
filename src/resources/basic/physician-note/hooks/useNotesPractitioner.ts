import { useState, type KeyboardEvent } from 'react'
import {
    usePhysicianNotes,
    useCreatePhysicianNote,
    useUpdatePhysicianNote,
    useDeletePhysicianNote,
} from '@resources/basic/physician-note/hooks/usePysicianNote'

export const useNotesPractitioner = (practitionerId: string) => {
    const { notes, isPending, isError, error } =
        usePhysicianNotes(practitionerId)
    const createNote = useCreatePhysicianNote(practitionerId)
    const updateNote = useUpdatePhysicianNote(practitionerId)
    const deleteNote = useDeletePhysicianNote(practitionerId)

    const [editingId, setEditingId] = useState<string | null>(null)
    const [editText, setEditText] = useState('')
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [newNoteText, setNewNoteText] = useState('')

    const handleNoteClick = (id: string, text: string) => {
        setEditingId(id)
        setEditText(text)
    }

    const handleEditBlur = (id: string) => {
        if (editText.trim()) {
            updateNote.mutate({ id, text: editText })
        }
        setEditingId(null)
    }

    const handleEditKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, id: string) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleEditBlur(id)
        }
    }

    const handleSave = () => {
        if (!newNoteText.trim()) return
        createNote.mutate(newNoteText, {
            onSuccess: () => {
                setIsAddOpen(false)
                setNewNoteText('')
            },
        })
    }

    const handleNewNoteKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSave()
        }
    }

    const handleDelete = (id: string) => {
        deleteNote.mutate(id)
    }

    const handleCancel = () => {
        setIsAddOpen(false)
        setNewNoteText('')
    }

    return {
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
        isCreating: createNote.isPending,
    }
}
