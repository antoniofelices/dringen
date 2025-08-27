import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import { Form } from '@components/ui/base/form'
import FormFieldTextareaControl from '@/components/ui/FormFieldTextareaControl'
import content from '@/config/data/health-consumer/pfsh'

const FormAdd = () => {
    const form = useForm({
        defaultValues: {
            pastMedicalHistory: '',
            familyHistory: '',
            socialHistory: '',
        },
    })

    const onSubmit = async (formData) => {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldTextareaControl
                    control={form.control}
                    fieldName="pastMedicalHistory"
                    label={content.labelPastMedicalHistory}
                />
                <FormFieldTextareaControl
                    control={form.control}
                    fieldName="familyHistory"
                    label={content.labelFamilyHistory}
                />
                <FormFieldTextareaControl
                    control={form.control}
                    fieldName="socialHistory"
                    label={content.labelSocialHistory}
                />
                <Button type="submit" className="w-full mt-4">
                    {form.formState.isSubmitting
                        ? content.textButtonSending
                        : content.textButtonSend}
                </Button>
            </form>
        </Form>
    )
}

const LoadData = ({ contentPfsh }) => {
    const contentPastMedicalHistory = contentPfsh.past_medical_history ?? ''
    const contentFamilyHistory = contentPfsh.family_history ?? ''
    const contentSocialHistory = contentPfsh.social_history ?? ''

    return (
        <ul className="">
            <li className="my-2">
                <span className="font-bold">
                    {content.labelPastMedicalHistory}
                </span>
                : {contentPastMedicalHistory}
            </li>
            <li className="my-2">
                <span className="font-bold">{content.labelFamilyHistory}</span>:{' '}
                {contentFamilyHistory}
            </li>
            <li className="my-2">
                <span className="font-bold">{content.labelSocialHistory}</span>:{' '}
                {contentSocialHistory}
            </li>
        </ul>
    )
}

const Pfsh = ({ contentPfsh }) => {
    const displayContent = contentPfsh ? true : false

    const [toggle, setToggle] = useState(true)

    const handleClick = () => {
        setToggle(!toggle)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                {displayContent && (
                    <CardAction>
                        <Button
                            size="xs"
                            variant="outline"
                            onClick={handleClick}
                        >
                            {toggle ? <>{content.textButtonEdit}</> : <X />}
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>
                {displayContent === false || toggle === false ? (
                    <FormAdd />
                ) : (
                    <LoadData contentPfsh={contentPfsh} />
                )}
            </CardContent>
        </Card>
    )
}

export default Pfsh
