import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
// import DataDisplayList from '@shared/components/ui/DataDisplayList'
import content from './PractitionerDetails.content'

const PractitionerDetails = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="mb-8">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>Una lista de detalles de la cuenta del Practitioner.</p>
                {/* <DataDisplayList items={dataItems} /> */}
            </CardContent>
        </Card>
    )
}

export default PractitionerDetails
