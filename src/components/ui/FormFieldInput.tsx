import { useId } from 'react'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'
import { Input } from '@/components/ui/base/input'
import { Label } from '@/components/ui/base/label'

type FormValues = {
    [key: string]: string
}

type FormFieldProps = {
    className?: string
    errors: FieldErrors<FormValues>
    fieldName: string
    icon?: LucideIcon
    label: string
    placeholder?: string
    register: UseFormRegister<FormValues>
    type?: string
}

const FormFieldInput = ({
    className = 'mb-5',
    errors,
    fieldName,
    icon: Icon,
    label,
    placeholder,
    register,
    type = 'text',
}: FormFieldProps) => {
    const inputId = useId()
    const error = errors?.[fieldName]

    return (
        <div className={className}>
            <Label
                htmlFor={inputId}
                className="text-sm font-bold flex items-center gap-2 mb-1"
            >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
            </Label>
            <Input
                id={inputId}
                type={type}
                {...register(fieldName)}
                placeholder={placeholder}
            />
            {error && (
                <span className="text-sm text-red-500 mt-1">
                    {String(error.message)}
                </span>
            )}
        </div>
    )
}

export default FormFieldInput
