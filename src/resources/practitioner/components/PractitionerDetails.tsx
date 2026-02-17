import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import DataDisplayList from '@shared/components/ui/DataDisplayList'
import Loading from '@shared/components/ui/Loading'
import ErrorApi from '@shared/components/ui/ErrorApi'
import { usePractitionerDetails } from '@resources/practitioner/hooks/usePractitionerDetails'
import content from './PractitionerDetails.content'

const PractitionerDetails = ({
    practitionerId,
}: {
    practitionerId: string
}) => {
    const {
        specialty,
        hospital,
        outpatientFacility,
        availableTime,
        isPending,
        isError,
        error,
        hasData,
    } = usePractitionerDetails(practitionerId)

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />
    if (!hasData) return null

    const dataItems = [
        { label: content.labelSpecialty, value: specialty },
        { label: content.labelHospital, value: hospital },
        { label: content.labelOutpatientFacility, value: outpatientFacility },
        { label: content.labelAvailableTime, value: availableTime },
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

export default PractitionerDetails
