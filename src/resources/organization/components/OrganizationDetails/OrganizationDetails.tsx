import { X } from 'lucide-react'
import RoleGuard from '@auth/components/RoleGuard'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import DataDisplayList from '@shared/components/ui/DataDisplayList'
import { useEditableForm } from '@shared/hooks/useEditableForm'
import type { OrganizationType } from '@resources/organization/types/organization.model'
import OrganizationDetailsForm from './OrganizationDetailsForm'
import { buildDataItems } from './OrganizationDetails.presenter'
import content from './OrganizationDetails.content'

const completenessCheck = (data: OrganizationType) => Boolean(data.name)

const OrganizationDetails = ({
    organization,
}: {
    organization: OrganizationType
}) => {
    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        organization,
        completenessCheck
    )

    const dataItems = buildDataItems(organization)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-bold text-gray-700 dark:text-gray-300">{content.title}</h2>
                </CardTitle>
                <RoleGuard allowedRoles={['administrative_hr']}>
                    <CardAction>
                        <Button
                            size="xs"
                            variant="outline"
                            onClick={handleToggle}
                        >
                            {!isEditing ? <>{content.textButtonEdit}</> : <X />}
                        </Button>
                    </CardAction>
                </RoleGuard>
            </CardHeader>
            <CardContent>
                {!isEditing ? (
                    <DataDisplayList items={dataItems} />
                ) : (
                    <OrganizationDetailsForm
                        organization={organization}
                        onSuccess={handleFormSuccess}
                    />
                )}
            </CardContent>
        </Card>
    )
}

export default OrganizationDetails
