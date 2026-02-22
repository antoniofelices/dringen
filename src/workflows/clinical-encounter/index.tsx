import AddClinicalEncounter from '@workflows/clinical-encounter/components/AddClinicalEncounter'
import EncounterList from '@workflows/clinical-encounter/components/EncounterList'

type Props = {
    patientId: string
    onSuccess?: () => void
}

const ClinicalEncounter = ({ patientId, onSuccess }: Props) => {
    return <AddClinicalEncounter patientId={patientId} onSuccess={onSuccess} />
}

export { EncounterList }
export default ClinicalEncounter
