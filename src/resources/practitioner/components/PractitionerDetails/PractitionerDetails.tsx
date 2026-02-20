import { X } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import DataDisplayList from '@shared/components/ui/DataDisplayList'
import Loading from '@shared/components/ui/Loading'
import ErrorApi from '@shared/components/ui/ErrorApi'
import { useEditableForm } from '@shared/hooks/useEditableForm'
import { usePractitionerDetails } from '@resources/practitioner/hooks/usePractitionerDetails'
import type { PractitionerDetailsData } from '@resources/practitioner/types/practitioner.model'
import PractitionerDetailsForm from './PractitionerDetailsForm'
import { buildDataItems } from './PractitionerDetails.presenter'
import content from './PractitionerDetails.content'

const completenessCheck = (data: PractitionerDetailsData) =>
    Boolean(data.specialty)

const PractitionerDetails = ({
    practitionerId,
}: {
    practitionerId: string
}) => {
    const {
        specialty,
        hospital,
        hospitalId,
        outpatientFacility,
        outpatientFacilityId,
        outpatientOptions,
        availableTime,
        isPending,
        isError,
        error,
        hasData,
    } = usePractitionerDetails(practitionerId)

    const detailsData: PractitionerDetailsData = {
        specialty,
        hospital,
        hospitalId,
        outpatientFacility,
        outpatientFacilityId,
        availableTime,
        hasData,
    }

    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        hasData ? detailsData : null,
        completenessCheck
    )

    if (isPending) return <Loading />
    if (isError && error) return <ErrorApi message={error.message} />
    if (!hasData) return null

    const dataItems = buildDataItems(detailsData)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                <CardAction>
                    <Button size="xs" variant="outline" onClick={handleToggle}>
                        {!isEditing ? <>{content.textButtonEdit}</> : <X />}
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {!isEditing ? (
                    <DataDisplayList items={dataItems} />
                ) : (
                    <>
                        <DataDisplayList
                            items={[
                                {
                                    label: content.labelHospital,
                                    value: hospital,
                                },
                                {
                                    label: content.labelAvailableTime,
                                    value: availableTime,
                                },
                            ]}
                        />
                        <PractitionerDetailsForm
                            practitionerId={practitionerId}
                            hospitalId={hospitalId}
                            defaultValues={{
                                specialty,
                                outpatientFacility:
                                    outpatientFacilityId || undefined,
                            }}
                            outpatientOptions={outpatientOptions}
                            onSuccess={handleFormSuccess}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default PractitionerDetails
