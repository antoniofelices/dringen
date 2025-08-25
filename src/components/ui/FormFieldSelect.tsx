import { useId } from 'react'
import type { Control, FieldErrors, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/base/select'
import { Label } from '@/components/ui/base/label'

type FormFieldProps<T extends FieldValues> = {
    className?: string
    errors: FieldErrors<T>
    fieldName: Path<T>
    control: Control<T>
    icon?: LucideIcon
    label: string
    placeholder?: string
    options: string[]
}

const FormFieldSelect = <T extends FieldValues>({
    className = 'mb-5',
    errors,
    fieldName,
    control,
    icon: Icon,
    label,
    placeholder,
    options,
}: FormFieldProps<T>) => {
    const selectId = useId()
    const error = errors?.[fieldName]

    return (
        <div className={className}>
            <Label htmlFor={selectId} className="font-bold">
                {Icon && <Icon className="w-4 h-4 inline mr-1" />}
                {label}
            </Label>
            <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger
                            id={selectId}
                            className="w-full border-gray-300 dark:border-gray-600"
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem value={option} key={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {error && (
                <span className="text-sm text-red-500 mt-1">
                    {String(error.message)}
                </span>
            )}
        </div>
    )
}

export default FormFieldSelect
