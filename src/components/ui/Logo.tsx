const Logo = ({ variant }: { variant?: string }) => {
    const fillColor = variant === 'white' ? '#ffffff' : '#00b3e5'

    return (
        <>
            <svg
                width="148"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="200 0 273.42 35.52"
            >
                <path
                    fill={fillColor}
                    d="M191.85,35.37h63.9A17.67,17.67,0,0,0,273.42,17.7h0A17.67,17.67,0,0,0,255.75,0h-63.9A17.67,17.67,0,0,0,174.18,17.7h0A17.67,17.67,0,0,0,191.85,35.37ZM10.1"
                />
            </svg>
        </>
    )
}

export default Logo
