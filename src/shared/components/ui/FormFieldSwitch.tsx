import type { Control, FieldValues, Path } from 'react-hook-form'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/base/form'
import { Switch } from '@/components/ui/base/switch'
type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    label: string
}

const FormFieldSwitch = <T extends FieldValues>({
    className = 'mb-5',
    control,
    description,
    fieldName,
    label,
}: FormFieldProps<T>) => {
    return (
        <div className={className}>
            <FormField
                control={control}
                name={fieldName}
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 border-gray-300 dark:border-gray-700">
                        <div className="space-y-0.5">
                            <FormLabel>{label}</FormLabel>
                            <FormDescription>{description}</FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default FormFieldSwitch
