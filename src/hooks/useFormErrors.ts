import { useState, useCallback } from 'react'
import type { FormErrors } from '@/types/interfaces'

const initialErrors: FormErrors = {
    isError: false,
    noEmailPassword: false,
    repeatEmail: false,
    register: false,
    message: '',
}
export const useFormErrors = () => {
    const [errors, setErrors] = useState(initialErrors)

    const errorHandler = useCallback((newErrors: Partial<FormErrors>) => {
        setErrors((prev) => ({ ...prev, ...newErrors }))
    }, [])

    const resetErrors = useCallback(() => {
        setErrors(initialErrors)
    }, [])

    return {
        errors,
        errorHandler,
        resetErrors,
    }
}
