import { CirclePlus, Trash2 } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import FormFieldSelect from '@shared/components/ui/FormFieldSelect'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import { roleOptions } from '@resources/practitioner/config/config'
import {
    GENDER_OPTIONS,
    DAYS_OF_WEEK_OPTIONS,
} from '@shared/fhir/valueSets.domain'
import { useAddNewPractitionerForm } from '@resources/practitioner/hooks/useAddNewPractitionerForm'
import type { AddNewPractitionerFormProps } from '@resources/practitioner/types/practitioner.model'
import content from './AddNewPractitionerForm.content'

const AddNewPractitionerForm = ({ onSuccess }: AddNewPractitionerFormProps) => {
    const {
        form,
        fields,
        roomOptions,
        specialtyComboOptions,
        role,
        addTimeHandler,
        removeTimeHandler,
        onSubmit,
    } = useAddNewPractitionerForm({ onSuccess })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="firstName"
                        label={content.labelFirstName}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="lastName"
                        label={content.labelLastName}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="email"
                        label={content.labelEmail}
                        type="email"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="phone"
                        label={content.labelPhone}
                        type="tel"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldCalendar
                        control={form.control}
                        fieldName="birthDate"
                        label={content.labelBirthDate}
                    />
                    <FormFieldSelect
                        control={form.control}
                        fieldName="gender"
                        label={content.labelGender}
                        options={GENDER_OPTIONS}
                    />
                </div>
                <FormFieldSelect
                    control={form.control}
                    fieldName="role"
                    label={content.labelRole}
                    options={roleOptions}
                />
                {role === 'doctor' && (
                    <div className="grid grid-cols-2 gap-4">
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="locationId"
                            label={content.labelLocation}
                            options={roomOptions}
                            placeholder={content.labelLocation}
                        />
                        <FormFieldCombobox
                            control={form.control}
                            fieldName="specialty"
                            label={content.labelSpecialty}
                            options={specialtyComboOptions}
                            placeholder={content.labelSpecialty}
                        />
                    </div>
                )}

                <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">
                        {content.labelAvailableTime}
                    </h3>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex gap-4 justify-between items-center mt-2"
                        >
                            <FormFieldSelect
                                className="w-full"
                                control={form.control}
                                fieldName={`availableTime.${index}.daysOfWeek`}
                                label={content.labelDaysOfWeek}
                                options={DAYS_OF_WEEK_OPTIONS}
                                placeholder={content.labelDaysOfWeek}
                            />
                            <FormFieldInput
                                className="w-full"
                                control={form.control}
                                fieldName={`availableTime.${index}.startTime`}
                                label={content.labelStartTime}
                                type="time"
                            />
                            <FormFieldInput
                                className="w-full"
                                control={form.control}
                                fieldName={`availableTime.${index}.endTime`}
                                label={content.labelEndTime}
                                type="time"
                            />
                            <div className="flex items-center gap-2 mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addTimeHandler}
                                >
                                    <CirclePlus size={16} />
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeTimeHandler(index)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {fields.length === 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTimeHandler}
                            className="mt-2"
                        >
                            <CirclePlus size={16} />
                            {content.textButtonAddTime}
                        </Button>
                    )}
                </div>
                <Button type="submit" className="w-full mt-4">
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
            {form.formState.errors.root && (
                <div className="text-red text-sm mt-2 text-center">
                    {form.formState.errors.root.message}
                </div>
            )}
        </Form>
    )
}

export default AddNewPractitionerForm
