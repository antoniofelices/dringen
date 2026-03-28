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
// import { useEditableForm } from '@shared/hooks/useEditableForm'
import type { OrganizationType } from '@resources/organization/types/organization.model'
import content from './OrganizationDetails.content'

const OrganizationDetails = ({
    organization,
}: {
    organization: OrganizationType
}) => {
    const dataItems = [
        { label: content.labelName, value: organization.name },
        { label: content.labelType, value: organization.type },
        { label: content.labelIdentifier, value: organization.identifier },
        { label: content.labelAddress, value: organization.address },
        { label: content.labelGeneralPhone, value: organization.phone },
        { label: content.labelGeneralEmail, value: organization.email },
        { label: content.labelAdminPhone, value: organization.adminPhone },
        { label: content.labelAdminEmail, value: organization.adminEmail },
    ]

    // const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
    //     hasData ? detailsData : null,
    //     completenessCheck
    // )

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="mb-8">{content.title}</h2>
                </CardTitle>
                <RoleGuard allowedRoles={['administrative_hr']}>
                    <CardAction>
                        <Button size="xs" variant="outline" onClick={() => {}}>
                            {/* {!isEditing ? <>{content.textButtonEdit}</> : <X />} */}
                            {
                                <>
                                    {content.textButtonEdit} <X />
                                </>
                            }
                        </Button>
                    </CardAction>
                </RoleGuard>
            </CardHeader>
            <CardContent>
                <DataDisplayList items={dataItems} />
            </CardContent>
        </Card>
    )
}

export default OrganizationDetails
