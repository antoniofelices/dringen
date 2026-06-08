import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@shared/utils/utils'

function Switch({
    className,
    ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50',
                'data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200',
                'dark:data-[state=checked]:bg-indigo-500 dark:data-[state=unchecked]:bg-gray-700',
                'focus-visible:ring-[3px] focus-visible:border-gray-950 focus-visible:ring-gray-950/50 dark:focus-visible:border-gray-300 dark:focus-visible:ring-gray-300/50',
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                data-slot="switch-thumb"
                className={cn(
                    'pointer-events-none block size-4 rounded-full ring-0 transition-transform',
                    'data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
                    'bg-white dark:data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-white'
                )}
            />
        </SwitchPrimitive.Root>
    )
}

export { Switch }
