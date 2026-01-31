import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { type VariantProps } from 'class-variance-authority'
import { supabase } from '@/services/supabaseService'
import { Button, buttonVariants } from '@/components/ui/base/button'
import ErrorApi from '@components/ui/ErrorApi'
import content from '@data/ui/buttonSignOut'

type ButtonSignOutProps = VariantProps<typeof buttonVariants> & {
    asbutton?: boolean
    className?: string
    children?: React.ReactNode
}

const ButtonSignOut = ({
    asbutton = true,
    variant = 'default',
    size = 'default',
    className,
    children,
    ...props
}: ButtonSignOutProps) => {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        setIsLoading(true)
        setError(null)

        const { error } = await supabase.auth.signOut()

        if (error) {
            setError(error.message)
            setIsLoading(false)
            return
        }

        navigate({ to: '/' })
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
                        ? 'Cerrando sesión...'
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
                        ? 'Cerrando sesión...'
                        : children || content.textButton}
                </button>
            )}
        </>
    )
}

export default ButtonSignOut
