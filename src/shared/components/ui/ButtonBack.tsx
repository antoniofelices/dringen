import { useRouter } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import content from '@data/ui/buttonBack'

const ButtonBack = () => {
    const router = useRouter()

    const backHandler = () => {
        router.history.back()
    }

    return (
        <footer className="lg:fixed lg:bottom-3 xxl:bottom-4 lg:right-4 xl:right-6">
            <button
                onClick={backHandler}
                className="flex gap-2 items-center mt-8 text-sm"
            >
                <ChevronLeft size="18" />
                {content.textButton}
            </button>
        </footer>
    )
}

export default ButtonBack
