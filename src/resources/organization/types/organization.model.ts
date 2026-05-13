import type { z } from 'zod'
import type { organizationDetailsSchema } from '@resources/organization/schemas/organizationDetails.schema'

export type OrganizationType = {
    id: string
    name: string
    type: string
    identifier: string
    address: string
    phone: string
    email: string
    adminContact: string
    adminPhone: string
    adminEmail: string
}

export type OrganizationDetailsFormType = z.infer<
    typeof organizationDetailsSchema
>
