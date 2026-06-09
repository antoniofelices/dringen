import { z } from 'zod'
import { FAMILY_MEMBER_HISTORY_STATUS_VALUES } from '@shared/fhir/valueSets.domain'
import { contentES as content } from './familyMemberHistory.content'

export const familyMemberHistorySchema = z
    .object({
        noKnownFamilyHistory: z.boolean(),
        relationship: z.string(),
        condition: z.string(),
        status: z.enum(FAMILY_MEMBER_HISTORY_STATUS_VALUES, {
            error: content.errorStatusRequired,
        }),
        deceasedBoolean: z.boolean(),
        note: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.noKnownFamilyHistory) {
            if (!data.relationship || data.relationship.trim() === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: content.errorRelationshipRequired,
                    path: ['relationship'],
                })
            }
            if (!data.condition || data.condition.trim() === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: content.errorConditionRequired,
                    path: ['condition'],
                })
            }
        }
    })
