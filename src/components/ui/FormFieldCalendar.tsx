import { CalendarIcon } from 'lucide-react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { transformDate } from '@/lib/utils'
import { Button } from '@components/ui/base/button'
import { Calendar } from '@/components/ui/base/calendar'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/base/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/base/popover'

type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    label: string
}

const FormFieldCalendar = <T extends FieldValues>({
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
                    <FormItem className="flex flex-col">
                        <FormLabel>{label}</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between font-normal border-gray-300 dark:border-gray-600"
                                    >
                                        {field.value ? (
                                            transformDate(field.value)
                                        ) : (
                                            <span>'Select date'</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date < new Date('2000-01-01')
                                    }
                                    captionLayout="dropdown"
                                />
                            </PopoverContent>
                        </Popover>
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

export default FormFieldCalendar
