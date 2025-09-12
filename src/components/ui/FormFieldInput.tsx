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
import { Input } from '@/components/ui/base/input'

type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    icon?: LucideIcon
    label: string
    placeholder?: string
    type?: string
    rules?: object
}

const FormFieldInput = <T extends FieldValues>({
    className = 'mb-5',
    control,
    description,
    fieldName,
    icon: Icon,
    label,
    placeholder,
    type = 'text',
    rules,
}: FormFieldProps<T>) => {
    return (
        <div className={className}>
            <FormField
                control={control}
                name={fieldName}
                rules={rules}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {Icon && <Icon className="w-4 h-4" />}
                            {label}
                        </FormLabel>
                        <FormControl>
                            <Input
                                type={type}
                                {...field}
                                placeholder={placeholder}
                                className="border-gray-300 dark:border-gray-600"
                            />
                        </FormControl>
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

export default FormFieldInput
