import AddClinicalEncounter from '@workflows/clinical-encounter/components/AddClinicalEncounter'

type Props = {
    patientId: string
    onSuccess?: () => void
}

const ClinicalEncounter = ({ patientId, onSuccess }: Props) => {
    return <AddClinicalEncounter patientId={patientId} onSuccess={onSuccess} />
}

export default ClinicalEncounter
