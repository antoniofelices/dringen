import type { ReactNode } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
} from '@shared/components/ui/base/drawer'

type DrawerWrapperProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    children: ReactNode
}

const DrawerWrapper = ({
    open,
    onOpenChange,
    title,
    description,
    children,
}: DrawerWrapperProps) => {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerOverlay className="bg-black/60" />
            <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[90vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                <DrawerHeader className="sr-only">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerWrapper
