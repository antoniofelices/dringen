const Logo = ({
    customClasses,
    size = 'h-[24px] w-[24px]',
    variant,
}: {
    customClasses?: string
    size?: string
    variant?: string
}) => {
    const fillColor = variant === 'white' ? '#ffffff' : '#00b3e5'

    return (
        <div className={`${customClasses} ${size}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke={fillColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"
                    transform="translate(2,2)"
                    stroke="rgba(0,0,0,0.3)"
                />
                <path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49" />
            </svg>
        </div>
    )
}

export default Logo
