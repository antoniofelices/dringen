import { X } from 'lucide-react'
import type { PatientType } from '@resources/patient/types/patient.model'
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
import PatientDemographicsForm from './PatientDemographicsForm'
import { buildDataItems } from './PatientDemographics.presenter'
import content from './PatientDemographics.content'

const completenessCheck = (data: PatientType) =>
    Boolean(data.firstName || data.lastName)

const PatientDemographics = ({
    patientData,
}: {
    patientData: PatientType | null
}) => {
    const { isEditing, handleToggle, handleFormSuccess } = useEditableForm(
        patientData,
        completenessCheck
    )

    if (!patientData) return null

    const dataItems = buildDataItems(patientData)

    return (
        <Card className="h-full">
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
                    <PatientDemographicsForm
                        patientData={patientData}
                        onSuccess={handleFormSuccess}
                    />
                )}
            </CardContent>
        </Card>
    )
}

export default PatientDemographics
