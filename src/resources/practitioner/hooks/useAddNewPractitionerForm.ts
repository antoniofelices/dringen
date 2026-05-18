import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { SNOMED_SYSTEM } from '@shared/fhir/config'
import { medplum } from '@shared/fhir/medplum'
import { toFhirTime } from '@shared/fhir/utils'
import { useLogger } from '@shared/hooks/useLogger'
import { useProject } from '@auth/hooks/useProject'
import { ROLE_PRACTITIONER_TO_POLICY_NAME } from '@resourcesmedplum/access-policy/domain/accessPolicy.domain'
import { useAccessPolicyList } from '@resourcesmedplum/access-policy/hooks/useAccessPolicy'
import { useClinicLocation } from '@resources/location/hooks/useClinicLocation'
import { useLocationsByParent } from '@resources/location/hooks/useLocationsByParent'
import { useOrganization } from '@resources/organization/hooks/useOrganization'
import { DAYS_OF_WEEK_OPTIONS } from '@shared/fhir/valueSets.domain'
import { SPECIALTY_TO_SNOMED } from '@resources/practitioner/domain/practitioner.domain'
import { PRACTITIONER_ROLE_TO_SNOMED } from '@resources/practitioner-role/domain/practitionerRole.domain'
import { addNewPractitionerFormSchema } from '@resources/practitioner/schemas/addNewPractitionerForm.schema'
import type {
    AddNewPractitionerFormType,
    AddNewPractitionerFormProps,
} from '@resources/practitioner/types/practitioner.model'
import content from '@resources/practitioner/components/AddNewPractitionerForm.content'

export const useAddNewPractitionerForm = ({
    onSuccess,
}: AddNewPractitionerFormProps = {}) => {
    const { logError, logSuccess } = useLogger('AddNewPractitionerForm')
    const { accessPolicies } = useAccessPolicyList()
    const { project } = useProject()
    const { organization } = useOrganization()
    const { locations: clinicLocations } = useClinicLocation()
    const { locations: rooms } = useLocationsByParent(
        clinicLocations[0]?.id ?? ''
    )

    const form = useForm<AddNewPractitionerFormType>({
        resolver: zodResolver(addNewPractitionerFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            birthDate: undefined,
            gender: undefined,
            availableTime: [],
            locationId: '',
            specialty: undefined,
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'availableTime',
    })

    const role = form.watch('role')

    const roomOptions = rooms.map((r) => ({
        label: r.name,
        value: r.id,
    }))

    const specialtyComboOptions = Object.entries(SPECIALTY_TO_SNOMED).map(
        ([key, [, display]]) => ({ label: display, value: key })
    )

    const addTimeHandler = () => {
        append({ daysOfWeek: DAYS_OF_WEEK_OPTIONS[0].value, startTime: '', endTime: '' })
    }

    const removeTimeHandler = (index: number) => {
        remove(index)
    }

    const onSubmit = async (formData: AddNewPractitionerFormType) => {
        try {
            const policyName = ROLE_PRACTITIONER_TO_POLICY_NAME[formData.role]
            const policy = accessPolicies.find((p) => p.name === policyName)
            const policyId = policy?.id
            const projectId = project?.id
            const mainLocation = clinicLocations[0]
            const hosLocationId = mainLocation?.id

            if (!policyId) {
                form.setError('root', {
                    message: `${content.errorNoAccessPolicy}: ${formData.role}`,
                })
                return
            }
            if (!projectId) throw new Error('Project ID not found')

            // Step 1 — Invite user
            const membership = await medplum.invite(projectId, {
                resourceType: 'Practitioner',
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                sendEmail: false,
                scope: 'server',
                upsert: true,
                membership: {
                    admin: formData.role === 'administrative-hr' ? true : false,
                    accessPolicy: {
                        reference: `AccessPolicy/${policyId}`,
                        display: policyName,
                    },
                },
            })

            if (membership.resourceType === 'OperationOutcome') {
                throw new Error(
                    membership.issue?.[0]?.details?.text ?? 'Invite failed'
                )
            }

            // Step 2 — Update Practitioner resource
            const practitionerReference = membership.profile
            if (!practitionerReference?.reference) {
                throw new Error(
                    'Practitioner reference not found in membership'
                )
            }
            const practitionerId = practitionerReference.reference.split('/')[1]

            const existingPractitioner = await medplum.readResource(
                'Practitioner',
                practitionerId
            )

            await medplum.updateResource({
                ...existingPractitioner,
                telecom: [{ system: 'phone', value: formData.phone }],
                birthDate: formData.birthDate
                    ? formData.birthDate.toISOString().split('T')[0]
                    : undefined,
                gender: formData.gender,
                active: true,
            })

            // Step 3 — Create PractitionerRole
            const snomedCode = PRACTITIONER_ROLE_TO_SNOMED[formData.role][0]
            const snomedDisplay = PRACTITIONER_ROLE_TO_SNOMED[formData.role][1]

            await medplum.createResource({
                resourceType: 'PractitionerRole',
                practitioner: {
                    reference: practitionerReference.reference,
                    display: practitionerReference.display,
                },
                organization: {
                    reference: `Organization/${organization?.id}`,
                    display: organization?.name,
                },
                ...(() => {
                    const locationEntries = [
                        ...(hosLocationId
                            ? [
                                  {
                                      reference: `Location/${hosLocationId}`,
                                      display: mainLocation?.name,
                                  },
                              ]
                            : []),
                        ...(formData.role === 'doctor' && formData.locationId
                            ? [
                                  {
                                      reference: `Location/${formData.locationId}`,
                                      display: rooms.find(
                                          (r) => r.id === formData.locationId
                                      )?.name,
                                  },
                              ]
                            : []),
                    ]
                    return locationEntries.length > 0
                        ? { location: locationEntries }
                        : {}
                })(),
                code: [
                    {
                        coding: [
                            {
                                system: SNOMED_SYSTEM,
                                code: snomedCode,
                                display: snomedDisplay,
                            },
                        ],
                    },
                ],
                ...(formData.specialty
                    ? {
                          specialty: [
                              {
                                  coding: [
                                      {
                                          system: SNOMED_SYSTEM,
                                          code: SPECIALTY_TO_SNOMED[
                                              formData.specialty
                                          ][0],
                                          display:
                                              SPECIALTY_TO_SNOMED[
                                                  formData.specialty
                                              ][1],
                                      },
                                  ],
                              },
                          ],
                      }
                    : {}),
                availableTime: formData.availableTime.map((time) => ({
                    daysOfWeek: [time.daysOfWeek],
                    availableStartTime: toFhirTime(time.startTime),
                    availableEndTime: toFhirTime(time.endTime),
                })),
            })

            logSuccess(content.textToastSuccess, content.title)
            toast.success(content.textToastSuccess)
            form.reset()
            if (onSuccess) onSuccess()
        } catch (error) {
            logError(content.textToastFail, error, content.title)
            toast.error(content.textToastFail)
        }
    }

    return {
        form,
        fields,
        roomOptions,
        specialtyComboOptions,
        role,
        addTimeHandler,
        removeTimeHandler,
        onSubmit,
    }
}
