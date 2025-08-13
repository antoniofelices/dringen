import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/base/select'
import { Label } from '@/components/ui/base/label'
import { useId } from 'react'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'

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
    options: string[]
    register: UseFormRegister<FormValues>
}

const FormFieldSelect = ({
    className = 'mb-5',
    errors,
    fieldName,
    icon: Icon,
    label,
    placeholder,
    options,
    register,
}: FormFieldProps) => {
    const selectId = useId()
    const error = errors?.[fieldName]

    return (
        <div className={className}>
            <Label
                htmlFor={selectId}
                className="text-sm font-bold flex items-center gap-2 mb-1"
            >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
            </Label>
            <Select id={selectId}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="w-full">
                    {options.map((option) => (
                        <SelectItem value={option} key={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
                {/* <Input
                    id={inputId}
                    type={type}
                    {...register(fieldName)}
                    placeholder={placeholder}
                /> */}
            </Select>
            {error && (
                <span className="text-sm text-red-500 mt-1">
                    {String(error.message)}
                </span>
            )}
        </div>
    )
}

export default FormFieldSelect
