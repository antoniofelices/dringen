import type { z } from 'zod'
import type { familyMemberHistorySchema } from '@resources/family-member-history/schemas/familyMemberHistory.schema'

export type FamilyMemberHistoryType = {
    id: string
    relationship: string
    condition: string
    status: string
    deceasedBoolean: boolean
    note: string
}

export type FamilyMemberHistoryFormProps = {
    patientId: string
    historyData?: FamilyMemberHistoryType
    mode: 'create' | 'edit'
    onSuccess: () => void
}

export type FamilyMemberHistoryDetailProps = {
    historyId: string
    patientId: string
    onSuccess: () => void
}

export type FamilyMemberHistoryFormType = z.infer<
    typeof familyMemberHistorySchema
>
