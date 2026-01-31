import { useState, useEffect } from 'react'

const BREAKPOINT = 768

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < BREAKPOINT)
        }
        mql.addEventListener('change', onChange)
        setIsMobile(window.innerWidth < BREAKPOINT)
        return () => mql.removeEventListener('change', onChange)
    }, [])

    return !!isMobile
}
