import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import content from './OrganizationDetails.content'

const PractitionerDetails = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="mb-8">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>Una lista de detalles de la Organizacion.</p>
                {/* <DataDisplayList items={dataItems} /> */}
            </CardContent>
        </Card>
    )
}

export default PractitionerDetails
