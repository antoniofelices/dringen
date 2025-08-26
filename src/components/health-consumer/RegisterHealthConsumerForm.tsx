import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerHealthConsumer } from '@/services/supabaseService'
import mapSupabaseError from '@/services/mapSupabaseErrors'
import { Button } from '@/components/ui/base/button'
import { Separator } from '@/components/ui/base/separator'
import FormFieldInput from '@components/ui/FormFieldInput'
import FormFieldSelect from '@components/ui/FormFieldSelect'
// import FormFieldCalendar from '@components/ui/FormFieldCalendar'
import content from '@/config/data/health-consumer/registerForm'

const registerHealthConsumerSchema = z.object({
    userName: z
        .string()
        .min(3, content.errorUserNameTooShort)
        .max(20, content.errorUserNameTooLong)
        .regex(/^[a-zA-Z0-9_]+$/, content.errorUserNameDisallowedCharacters),
    userLastName: z
        .string()
        .min(3, content.errorUserLastNameTooShort)
        .max(20, content.errorUserLastNameTooLong)
        .regex(
            /^[a-zA-Z0-9_]+$/,
            content.errorUserLastNameDisallowedCharacters
        ),
    dni: z
        .string()
        .min(9, content.errorUserDniTooShort)
        .max(9, content.errorUserDniTooLong)
        .regex(/^\d{8}[A-Z]$/, content.errorUserDniInvalidFormat),
    email: z
        .string()
        .email(content.errorEmailInvalid)
        .min(1, content.errorEmailRequired),
    phone: z.string().optional(),
    placeOfResidence: z.string().optional(),
})

type FormData = z.infer<typeof registerHealthConsumerSchema>

const RegisterHealthConsumerForm = () => {
    const {
        // control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(registerHealthConsumerSchema),
    })

    const onSubmit = async (data: FormData) => {
        try {
            console.log('Datos enviados:', data)
            const { error } = await registerHealthConsumer(
                data.userName,
                data.userLastName,
                data.dni,
                data.email,
                data.phone,
                data.placeOfResidence

                // data.birthday,
                // data.gender,
                // data.birthplace,
                // data.occupation
            )
            if (error) {
                console.error('Error de Supabase:', error)
                const { field, message } = mapSupabaseError(error.message)
                setError(field, {
                    type: 'server',
                    message,
                })
                return
            }
            console.log('Usuario creado exitosamente!')
        } catch (err) {
            console.error('Error en onSubmit:', err)
            setError('root', {
                type: 'server',
                message: 'Error inesperado al crear el usuario',
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <h2 className="mb-6">Basic information</h2> */}
                <FormFieldInput
                    errors={errors}
                    fieldName="userName"
                    label={content.labelUserName}
                    placeholder="Manolo"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="userLastName"
                    label={content.labelUserLastName}
                    placeholder="Kabezabolo"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="email"
                    label={content.labelEmail}
                    placeholder="nf@manolo.es"
                    register={register}
                    type="email"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="dni"
                    label={content.labelDNI}
                    placeholder="12121212P"
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="phone"
                    label={content.labelPhone}
                    placeholder=""
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="placeOfResidence"
                    label={content.labelPlaceOfResidence}
                    placeholder=""
                    register={register}
                    type="text"
                />
                {/* <Separator className="my-12" /> */}
                {/* <h2 className="mb-6">Optional information</h2>
                <FormFieldSelect
                    errors={errors}
                    fieldName="gender"
                    label={content.labelGender}
                    options={['other', 'female', 'male']}
                    placeholder="Other"
                    control={control}
                />

                <FormFieldInput
                    errors={errors}
                    fieldName="birthplace"
                    label={content.labelBirthplace}
                    placeholder=""
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="placeOfResidence"
                    label={content.labelPlaceOfResidence}
                    placeholder=""
                    register={register}
                    type="text"
                />
                <FormFieldInput
                    errors={errors}
                    fieldName="occupation"
                    label={content.labelOccupation}
                    placeholder=""
                    register={register}
                    type="text"
                /> */}
                {/* <FormFieldCalendar
                    errors={errors}
                    fieldName="birthday"
                    label={content.labelBirthday}
                    control={control}
                /> */}
                <Button type="submit" className="w-full mt-4">
                    {isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
            {errors.root && (
                <div className="text-red text-sm mt-2 text-center">
                    {errors.root.message}
                </div>
            )}
        </>
    )
}

export default RegisterHealthConsumerForm
