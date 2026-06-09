import { LoaderCircle } from 'lucide-react'
import { contentES as content } from './Loading.content'

const Loading = () => {
    return (
        <div className="grid h-screen place-items-center">
            <LoaderCircle />
            <span className="sr-only">{content.textLoading}…</span>
        </div>
    )
}

export default Loading
