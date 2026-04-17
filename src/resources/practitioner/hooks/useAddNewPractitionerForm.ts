import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { SNOMED_SYSTEM } from '@shared/fhir/config'
import { medplum, authenticateMedplum } from '@shared/fhir/medplum'
import { useLogger } from '@shared/hooks/useLogger'
import { useProject } from '@auth/hooks/useProject'
import { ROLE_PRACTITIONER_TO_POLICY_NAME } from '@resourcesmedplum/access-policy/domain/accessPolicy.domain'
import { useAccessPolicyList } from '@resourcesmedplum/access-policy/hooks/useAccessPolicy'
import { getRoomsByOrganization } from '@resources/location/services/location.service'
import { fhirToLocation } from '@resources/location/domain/location.adapter'
import { useOrganization } from '@resources/organization/hooks/useOrganization'
import { daysOfWeekOptions } from '@resources/practitioner/config/config'
import { ROLE_PRACTITIONER_TO_SNOMED } from '@resources/practitioner/domain/practitioner.domain'
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
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'availableTime',
    })

    const role = form.watch('role')

    const { data: roomLocations = [] } = useQuery({
        queryKey: ['locations', 'rooms', organization?.id],
        queryFn: async () => {
            const locations = await getRoomsByOrganization(
                organization?.id ?? ''
            )
            return locations.map(fhirToLocation)
        },
        enabled: role === 'doctor' && !!organization?.id,
    })

    const roomOptions = roomLocations.map((l) => ({
        label: l.name,
        value: l.id,
    }))

    const addTimeHandler = () => {
        append({ daysOfWeek: daysOfWeekOptions[0], startTime: '', endTime: '' })
    }

    const removeTimeHandler = (index: number) => {
        remove(index)
    }

    const toFhirTime = (time: string) =>
        time.length === 5 ? `${time}:00` : time

    const onSubmit = async (formData: AddNewPractitionerFormType) => {
        try {
            await authenticateMedplum()

            const policyName = ROLE_PRACTITIONER_TO_POLICY_NAME[formData.role]
            const policy = accessPolicies.find((p) => p.name === policyName)
            const policyId = policy?.id
            const projectId = project?.id

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
            const snomedCode = ROLE_PRACTITIONER_TO_SNOMED[formData.role][0]
            const snomedDisplay = ROLE_PRACTITIONER_TO_SNOMED[formData.role][1]

            await medplum.createResource({
                resourceType: 'PractitionerRole',
                practitioner: {
                    reference: practitionerReference.reference,
                    display: practitionerReference.display,
                },
                organization: {
                    reference: `Organization/${organization?.id}`,
                },
                location: [
                    {
                        reference: `Location/<ID clinica>`,
                    },
                ],
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
                availableTime: formData.availableTime.map((time) => ({
                    daysOfWeek: [time.daysOfWeek],
                    availableStartTime: toFhirTime(time.startTime),
                    availableEndTime: toFhirTime(time.endTime),
                })),
                ...(formData.role === 'doctor' && formData.locationId
                    ? {
                          location: [
                              {
                                  reference: `Location/${formData.locationId}`,
                              },
                          ],
                      }
                    : {}),
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
        role,
        addTimeHandler,
        removeTimeHandler,
        onSubmit,
    }
}
