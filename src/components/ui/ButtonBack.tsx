import { useRouter } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import content from '@data/ui/buttonBack'

const ButtonBack = () => {
    const router = useRouter()

    const backHandler = () => {
        router.history.back()
    }

    return (
        <button
            onClick={backHandler}
            className="flex gap-2 items-center mt-8 text-sm"
        >
            <ChevronLeft size="18" />
            {content.textButton}
        </button>
    )
}

export default ButtonBack
