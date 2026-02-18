import { useContext } from 'react'
import { AuthContext } from '@auth/context/authContext'

export const useAuthContext = () => useContext(AuthContext)
