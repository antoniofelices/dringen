import type { Control, FieldValues, Path } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/base/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/base/select'

type OptionType = {
    label: string
    value: string
}
type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    icon?: LucideIcon
    label: string
    placeholder?: string
    options: OptionType[]
}

const FormFieldSelectArray = <T extends FieldValues>({
    className = 'mb-5',
    control,
    description,
    fieldName,
    icon: Icon,
    label,
    placeholder,
    options,
}: FormFieldProps<T>) => {
    return (
        <div className={className}>
            <FormField
                control={control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {Icon && <Icon className="w-4 h-4" />}
                            {label}
                        </FormLabel>
                        <Select
                            onValueChange={(value) => {
                                const selectedOption = options.find(option => option.value === value)
                                field.onChange(selectedOption || null)
                            }}
                            defaultValue={field.value?.value || ''}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full border-gray-300 dark:border-gray-600">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default FormFieldSelectArray
