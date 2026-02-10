export type PatientType = {
    id: string
    firstName: string
    lastName: string
    birthDate: string
    email: string
    address: string
    dni: string
    gender: 'male' | 'female' | 'other' | 'unknown'
}
