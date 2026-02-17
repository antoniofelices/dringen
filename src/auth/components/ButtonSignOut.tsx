import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@shared/components/ui/base/button'
import ErrorApi from '@shared/components/ui/ErrorApi'
import { signOut } from '@auth/services/auth.service'
import type { ButtonSignOutType } from '@auth/types/auth.model'
import content from './ButtonSignOut.content'

const ButtonSignOut = ({
    asbutton = true,
    variant = 'default',
    size = 'default',
    className,
    children,
    ...props
}: ButtonSignOutType) => {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        setIsLoading(true)
        setError(null)

        try {
            await signOut()
            navigate({ to: '/' })
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Error signing out'
            setError(message)
            setIsLoading(false)
        }
    }

    return (
        <>
            {error && <ErrorApi message={error} />}

            {asbutton ? (
                <Button
                    onClick={handleLogout}
                    variant={variant}
                    size={size}
                    className={className}
                    disabled={isLoading}
                    {...props}
                >
                    {isLoading
                        ? content.textClosing
                        : children || content.textButton}
                </Button>
            ) : (
                <button
                    onClick={handleLogout}
                    className={className}
                    disabled={isLoading}
                    {...props}
                >
                    {isLoading
                        ? content.textClosing
                        : children || content.textButton}
                </button>
            )}
        </>
    )
}

export default ButtonSignOut
