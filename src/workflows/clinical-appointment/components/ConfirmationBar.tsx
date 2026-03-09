import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import { useConfirmationBar } from '@workflows/clinical-appointment/hooks/useConfirmationBar'
import { DAYS, MONTHS } from '@workflows/clinical-appointment/config/config'
import type { ConfirmationBarProps } from '@workflows/clinical-appointment/types/clinicalAppointment.model'
import content from './ConfirmationBar.content'

const ConfirmationBar = ({
    selected,
    practitionerId,
    onCancel,
}: ConfirmationBarProps) => {
    const { form, onSubmit, isSubmitting, patientOptions, patientValue } =
        useConfirmationBar(practitionerId, selected, onCancel)

    if (!selected) return null

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-t border-gray-200 dark:border-gray-800 z-50">
                <Form {...form}>
                    <form
                        onSubmit={onSubmit}
                        className="px-6 py-4 flex items-center gap-8"
                    >
                        <div className="flex-1">
                            <p className="font-semibold">
                                {content.textAppointment}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {DAYS[selected.date.getDay()]}{' '}
                                {selected.date.getDate()}{' '}
                                {MONTHS[selected.date.getMonth()]}
                                <span className="mx-2">&middot;</span>
                                <span className="font-semibold">
                                    {selected.slot}h
                                </span>
                            </p>
                        </div>

                        <FormFieldCombobox
                            control={form.control}
                            modal
                            className="mb-0"
                            textCommandEmpty={content.textNoPatientFound}
                            fieldName="patient"
                            label={content.labelPatient}
                            placeholder={content.placeholderPatient}
                            options={patientOptions}
                            isSrOnlyLabel={true}
                        />

                        <div className="flex items-center gap-3">
                            <Button
                                type="button"
                                onClick={onCancel}
                                variant="secondary"
                            >
                                {content.textButtonCancel}
                            </Button>
                            <Button
                                type="submit"
                                disabled={!patientValue || isSubmitting}
                            >
                                {content.textButtonConfirm}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="h-24" />
        </>
    )
}

export default ConfirmationBar
