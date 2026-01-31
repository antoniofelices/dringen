import type { Control, FieldValues, Path } from 'react-hook-form'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/base/form'
import { Input } from '@/components/ui/base/input'
import content from '@data/ui/formFieldUpload'

type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    label: string
    placeholder?: string
    accept?: string
    maxSize?: number
}

const FormFieldUpload = <T extends FieldValues>({
    className = 'mb-5',
    control,
    description,
    fieldName,
    label,
    accept = '.pdf,.jpg,.jpeg,.png',
    maxSize = 1 * 1024 * 1024,
}: FormFieldProps<T>) => {
    return (
        <div className={className}>
            <FormField
                control={control}
                name={fieldName}
                rules={{
                    validate: (file: File | null) => {
                        if (!file) return `${content.textSelectFile}`

                        if (file.size > maxSize) {
                            return `${content.textFileSize} ${(maxSize / (1024 * 1024)).toFixed(1)}MB`
                        }

                        if (accept) {
                            const allowedTypes = accept
                                .split(',')
                                .map((type) => type.trim())
                            const fileExtension =
                                '.' + file.name.split('.').pop()?.toLowerCase()
                            const mimeType = file.type

                            const isValidType = allowedTypes.some(
                                (allowedType) =>
                                    allowedType === fileExtension ||
                                    allowedType === mimeType ||
                                    (allowedType.startsWith('.') &&
                                        fileExtension === allowedType)
                            )

                            if (!isValidType) {
                                return `${content.textAcceptedType} ${accept}`
                            }
                        }

                        return true
                    },
                }}
                render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept={accept}
                                name={field.name}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null
                                    onChange(file)
                                }}
                                className="border-gray-300 dark:border-gray-600"
                            />
                        </FormControl>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        {maxSize && (
                            <FormDescription>
                                {content.textMaxFileSize}:{' '}
                                {(maxSize / (1024 * 1024)).toFixed(1)}MB
                            </FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default FormFieldUpload
