import type { ButtonHTMLAttributes } from 'react'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string | undefined
    classes?: string
    url?: string
    variant?: 'blue' | 'transparent'
    icon?: boolean
    orientationIcon?: 'right' | 'left'
}

export type MovieProps = {
    id: number
    overview?: string
    poster_path?: string
    tagline?: string
    title: string
    vote_average?: number
    vote_count?: number
    release_date?: string
}

export type PersonCreditProps = {
    id: number
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    character?: string
}

export type PersonMovieProps = {
    cast: PersonCreditProps[]
    id: number
}

export type CastMember = {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export type CreditsMovieProps = {
    id: number
    cast: CastMember[]
}

export type PersonProps = {
    id: number
    biography?: string
    birthday?: string
    name: string
    profile_path?: string
    place_of_birth?: string
    cast?: []
}

export type RoutesProps = {
    id: number
    url: string
    text: string
    orderMenu?: number
}

export type Form = {
    labelConfirmPassword?: string
    labelEmail: string
    labelPassword: string
    labelUserName?: string
    textError: string
    textButtonSignIn?: string
    textButtonSignUp?: string
    errorNoEmailPassword?: string
    error?: string
    errorEmailRepeat?: string
    textSignIn?: string
}

export type FormErrors = {
    isError?: boolean
    noEmailPassword?: boolean
    repeatEmail?: boolean
    register?: boolean
    message?: string
}
