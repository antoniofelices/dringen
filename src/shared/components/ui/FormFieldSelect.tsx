import type { Control, FieldValues, Path } from 'react-hook-form'
import type { LucideIcon } from 'lucide-react'
import { normalizeOptions } from '@shared/utils/utils'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@shared/components/ui/base/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@shared/components/ui/base/select'

type OptionType = { label: string; value: string }

type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    icon?: LucideIcon
    label: string
    placeholder?: string
    options: readonly string[] | readonly OptionType[]
}

const FormFieldSelect = <T extends FieldValues>({
    className = 'mb-5',
    control,
    description,
    fieldName,
    icon: Icon,
    label,
    placeholder,
    options,
}: FormFieldProps<T>) => {
    const normalized = normalizeOptions(options)

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
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full border-gray-300 dark:border-gray-600">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {normalized.map((option) => (
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

export default FormFieldSelect
