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

type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    icon?: LucideIcon
    label: string
    placeholder?: string
    options: string[] | readonly string[]
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
                                {options.map((option) => (
                                    <SelectItem value={option} key={option}>
                                        {option}
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
