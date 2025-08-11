import { useRouter } from '@tanstack/react-router'

const ButtonBack = () => {
    const router = useRouter()

    const backHandler = () => {
        router.history.back()
    }

    return (
        <button onClick={backHandler} className="flex gap-2 items-center mt-8">
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
            Back
        </button>
    )
}

export default ButtonBack
