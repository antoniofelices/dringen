import { Button } from '@shared/components/ui/base/button'
import { Form } from '@shared/components/ui/base/form'
import FormFieldInput from '@shared/components/ui/FormFieldInput'
import FormFieldCombobox from '@shared/components/ui/FormFieldCombobox'
import FormFieldCalendar from '@shared/components/ui/FormFieldCalendar'
import { useAddNewPatientForm } from '@resources/patient/hooks/useAddNewPatientForm'
import content from './AddNewPatientForm.content'

const AddNewPatientForm = () => {
    const { form, onSubmit } = useAddNewPatientForm()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="userName"
                        label={content.labelUserName}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="userLastName"
                        label={content.labelUserLastName}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="dni"
                        label={content.labelDNI}
                        placeholder="12121212P"
                        type="text"
                    />
                    <FormFieldCalendar
                        control={form.control}
                        fieldName="birthDate"
                        label={content.labelBirthday}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="gender"
                        label={content.labelGender}
                        options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' },
                            { label: 'Unknown', value: 'unknown' },
                        ]}
                    />
                    <FormFieldCombobox
                        control={form.control}
                        fieldName="maritalStatus"
                        label={content.labelMaritalStatus}
                        options={[
                            { label: 'Annulled', value: 'A' },
                            { label: 'Divorced', value: 'D' },
                            { label: 'Interlocutory', value: 'I' },
                            { label: 'Legally Separated', value: 'L' },
                            { label: 'Married', value: 'M' },
                            { label: 'Polygamous', value: 'P' },
                            { label: 'Never Married', value: 'S' },
                            { label: 'Domestic Partner', value: 'T' },
                            { label: 'Unmarried', value: 'U' },
                            { label: 'Widowed', value: 'W' },
                            { label: 'Unknown', value: 'UNK' },
                        ]}
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
                        type="text"
                    />
                </div>
                <FormFieldInput
                    control={form.control}
                    fieldName="street"
                    label={content.labelStreet}
                    type="text"
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="district"
                        label={content.labelDistrict}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="city"
                        label={content.labelCity}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormFieldInput
                        control={form.control}
                        fieldName="postcode"
                        label={content.labelPostcode}
                        type="text"
                    />
                    <FormFieldInput
                        control={form.control}
                        fieldName="country"
                        label={content.labelCountry}
                        type="text"
                    />
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

export default AddNewPatientForm
