import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import DataDisplayList from '@shared/components/ui/DataDisplayList'
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="mb-8">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataDisplayList items={dataItems} />
            </CardContent>
        </Card>
    )
}

export default OrganizationDetails
