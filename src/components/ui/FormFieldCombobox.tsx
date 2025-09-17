import { Check, ChevronsUpDown } from 'lucide-react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Button } from '@components/ui/base/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/base/command'
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

type OptionType = {
    label: string
    value: string
}

type FormFieldProps<T extends FieldValues> = {
    className?: string
    control: Control<T>
    description?: string
    fieldName: Path<T>
    label: string
    placeholder?: string
    options: OptionType[]
    textCommandEmpty?: string
}

const FormFieldCombobox = <T extends FieldValues>({
    className = 'mb-5',
    control,
    description,
    fieldName,
    label,
    placeholder = '',
    options,
    textCommandEmpty = '',
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
                                        className={cn(
                                            'w-full justify-between font-normal border-gray-300 dark:border-gray-600',
                                            !field.value &&
                                                'text-muted-foreground'
                                        )}
                                    >
                                        {field.value
                                            ? options.find(
                                                  (option) =>
                                                      option.value ===
                                                      field.value
                                              )?.label
                                            : `${placeholder}`}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput
                                        placeholder={`${placeholder}`}
                                        className="h-9"
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            {textCommandEmpty}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    value={option.label}
                                                    key={option.value}
                                                    onSelect={() => {
                                                        field.onChange(
                                                            option.value
                                                        )
                                                    }}
                                                >
                                                    {option.label}
                                                    <Check
                                                        className={cn(
                                                            'ml-auto',
                                                            option.value ===
                                                                field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
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

export default FormFieldCombobox
