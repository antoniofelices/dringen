const ErrorApi = ({ message }: { message: string }) => {
    return (
        <div className="grid h-screen place-items-center">
            <h1>
                Sorry about this, but I'm afraid there is nothing more I can do.
            </h1>
            <p>Error: {message}</p>
        </div>
    )
}

export default ErrorApi
