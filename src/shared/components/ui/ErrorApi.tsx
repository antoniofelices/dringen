import content from './ErrorApi.content'

const ErrorApi = ({ message }: { message: string }) => {
    return (
        <div className="grid h-screen place-items-center">
            <h1>{content.title}</h1>
            <p>
                {content.textError}: {message}
            </p>
        </div>
    )
}

export default ErrorApi
