import { useId, useState } from 'react'
import type { Control, FieldErrors, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { ChevronDownIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@components/ui/base/button'
import { Calendar } from '@/components/ui/base/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/base/popover'
import { Label } from '@/components/ui/base/label'

type FormFieldProps<T extends FieldValues> = {
    className?: string
    errors: FieldErrors<T>
    fieldName: Path<T>
    control: Control<T>
    icon?: LucideIcon
    label: string
}

const FormFieldCalendar = <T extends FieldValues>({
    className = 'mb-5',
    errors,
    fieldName,
    control,
    icon: Icon,
    label,
}: FormFieldProps<T>) => {
    const selectId = useId()
    const error = errors?.[fieldName]

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
        <div className={className}>
            <Controller
                name={fieldName}
                control={control}
                render={({ field }) => (
                    <>
                        <Label htmlFor={selectId} className="font-bold">
                            {Icon && <Icon className="w-4 h-4 inline mr-1" />}
                            {label}
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                >
                                    {field.value
                                        ? field.value.toLocaleDateString()
                                        : 'Select date'}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date)
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </>
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

export default FormFieldCalendar
