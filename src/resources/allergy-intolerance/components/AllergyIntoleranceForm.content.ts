const content = {
    labelNoKnownAllergies: 'No known allergies',
    descriptionNoKnownAllergies:
        'Toggle if the patient has no known allergies',
    labelSubstance: 'Substance',
    labelType: 'Type',
    labelCategory: 'Category',
    labelCriticality: 'Criticality',
    labelClinicalStatus: 'Clinical status',
    labelVerificationStatus: 'Verification status',
    labelOnsetDateTime: 'Onset date',
    labelManifestation: 'Manifestation',
    labelSeverity: 'Severity',
    labelNote: 'Note',
    placeholderSubstance: 'e.g. Peanuts, Penicillin...',
    placeholderManifestation: 'e.g. Hives, Anaphylaxis...',
    placeholderNote: 'Additional notes...',
    placeholderSelect: 'Select...',
    textButtonSave: 'Save',
    textButtonSaving: 'Saving...',
    textToastSuccess: 'Allergy saved successfully',
    textToastFail: 'Failed to save allergy',
    typeOptions: [
        { label: 'Allergy', value: 'allergy' },
        { label: 'Intolerance', value: 'intolerance' },
    ],
    categoryOptions: [
        { label: 'Food', value: 'food' },
        { label: 'Medication', value: 'medication' },
        { label: 'Environment', value: 'environment' },
        { label: 'Biologic', value: 'biologic' },
    ],
    criticalityOptions: [
        { label: 'Low', value: 'low' },
        { label: 'High', value: 'high' },
        { label: 'Unable to assess', value: 'unable-to-assess' },
    ],
    clinicalStatusOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Resolved', value: 'resolved' },
    ],
    verificationStatusOptions: [
        { label: 'Unconfirmed', value: 'unconfirmed' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Refuted', value: 'refuted' },
        { label: 'Entered in error', value: 'entered-in-error' },
    ],
    severityOptions: [
        { label: 'Mild', value: 'mild' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Severe', value: 'severe' },
    ],
}

export default content
