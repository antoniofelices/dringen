import { createContext } from 'react'

type PatientContextType = {}
export const PatientContext = createContext<PatientContextType | undefined>(
    undefined
)
