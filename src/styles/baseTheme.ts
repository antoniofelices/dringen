import { createTheme } from 'flowbite-react'

const baseTheme = createTheme({
    button: {
        base: '',
        size: {
            xs: 'h-6 px-3 text-xs',
            sm: 'h-7 px-3 text-sm',
            md: 'h-[48px] px-5 py-3 text-base',
            lg: 'h-[64px] px-5 py-3 text-base',
            xl: 'h-[88px] px-6 py-3 text-base',
        },
    },
    modal: {
        root: {},
        content: {
            base: 'relative h-full w-full p-4 md:h-auto',
            inner: 'relative flex min-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-800 dark:text-white',
        },
    },
})

export default baseTheme
