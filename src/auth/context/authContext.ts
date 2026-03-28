import { createContext } from 'react'
import type { AuthContextState } from '@auth/types/auth.model'

const initialState: AuthContextState = {
    profile: undefined,
    role: null,
    loading: true,
    isLoggedIn: false,
}

export const AuthContext = createContext<AuthContextState>(initialState)
