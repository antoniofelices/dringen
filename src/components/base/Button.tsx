import type { ButtonProps } from '@/types/interfaces'
import { Link } from '@tanstack/react-router'

const Button = ({
    classes,
    onClick,
    text,
    url,
    variant,
    icon,
    orientationIcon,
    type = 'button',
}: ButtonProps) => {
    const individualClasses = classes ? classes : ''
    let variantOption =
        'text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'

    if (variant === 'transparent') {
        variantOption =
            'text-gray-900 border border-gray-700 hover:bg-blue-300 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-blue-300 dark:hover:text-blue-900 dark:focus:ring-blue-300'
    }

    return (
        <>
            <button
                className={`inline-flex items-center justify-center px-5 py-3 mb-6 text-base font-medium text-center rounded-lg ${variantOption} ${individualClasses}`}
                onClick={onClick}
                type={type}
            >
                {url ? <Link to={url}>{text}</Link> : <>{text}</>}
                {icon && orientationIcon === 'right' && (
                    <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                )}
                {icon && orientationIcon === 'left' && (
                    <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 3.293a1 1 0 00-1.414 0l-6 6a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L5.414 11H17a1 1 0 100-2H5.414l4.293-4.293a1 1 0 000-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                )}
            </button>
        </>
    )
}

export default Button
