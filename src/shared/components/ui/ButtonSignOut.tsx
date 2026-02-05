import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { type VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '@shared/components/ui/base/button'
import ErrorApi from '@shared/components/ui/ErrorApi'
import content from './ButtonSignOut.content'

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
        // setIsLoading(true)
        // setError(null)

        // const { error } = null

        // if (error) {
        //     setError(error.message)
        //     setIsLoading(false)
        //     return
        // }

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
