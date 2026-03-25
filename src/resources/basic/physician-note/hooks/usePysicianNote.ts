import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getPhysicianNotesByPractitioner,
    createPhysicianNote,
    updatePhysicianNote,
    deletePhysicianNote,
} from '@resources/basic/physician-note/services/physicianNote.service'
import {
    fhirToPhysicianNote,
    physicianNoteToFhir,
} from '@resources/basic/physician-note/domain/physicianNote.adapter'

export const usePhysicianNotes = (practitionerId: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['physicianNotes', practitionerId],
        queryFn: () => getPhysicianNotesByPractitioner(practitionerId),
        select: (data) => data.map(fhirToPhysicianNote),
        enabled: !!practitionerId,
    })

    return {
        notes: data ?? [],
        isPending,
        isError,
        error,
    }
}

export const useCreatePhysicianNote = (practitionerId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (text: string) => {
            const resource = physicianNoteToFhir(text, practitionerId)
            return createPhysicianNote(resource)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['physicianNotes', practitionerId],
            })
        },
    })
}

export const useUpdatePhysicianNote = (practitionerId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, text }: { id: string; text: string }) => {
            const resource = physicianNoteToFhir(text, practitionerId)
            return updatePhysicianNote(id, resource)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['physicianNotes', practitionerId],
            })
        },
    })
}

export const useDeletePhysicianNote = (practitionerId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deletePhysicianNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['physicianNotes', practitionerId],
            })
        },
    })
}
