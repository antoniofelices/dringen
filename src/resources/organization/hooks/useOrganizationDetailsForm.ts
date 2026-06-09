import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type {
    OrganizationType,
    OrganizationDetailsFormType,
} from '@resources/organization/types/organization.model'
import { organizationDetailsSchema } from '@resources/organization/schemas/organizationDetails.schema'
import { useUpdateOrganization } from '@resources/organization/hooks/useUpdateOrganization'
import { contentES as content } from '@resources/organization/components/OrganizationDetails/OrganizationDetails.content'

export const useOrganizationDetailsForm = ({
    organization,
    onSuccess,
}: {
    organization: OrganizationType
    onSuccess: () => void
}) => {
    const updateOrganization = useUpdateOrganization(organization.id)

    const form = useForm<OrganizationDetailsFormType>({
        resolver: zodResolver(organizationDetailsSchema),
        defaultValues: {
            name: organization.name || '',
            type: organization.type || '',
            identifier: organization.identifier || '',
            address: organization.address || '',
            phone: organization.phone || '',
            email: organization.email || '',
            adminPhone: organization.adminPhone || '',
            adminEmail: organization.adminEmail || '',
        },
    })

    const onSubmit = async (formData: OrganizationDetailsFormType) => {
        try {
            await updateOrganization.mutateAsync(formData)
        } catch {
            toast.error(content.textToastFail)
            return
        }
        toast.success(content.textToastSuccess)
        onSuccess()
    }

    return { form, onSubmit }
}
