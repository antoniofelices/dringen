import { APIMOVIESIMAGESURL } from '@/config/config'
import { useNavigate } from '@tanstack/react-router'

const Card = ({
    id,
    image,
    title,
    type,
}: {
    id: number
    image?: string
    title?: string
    type: string
}) => {
    const navigate = useNavigate()

    const typeContent = type === 'movie' ? 'movie' : 'person'

    const handleCardClick = () => {
        navigate({ to: `/${typeContent}/${id}` })
    }

    return (
        <div
            onClick={handleCardClick}
            className="flex flex-col rounded-lg cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick()
                }
            }}
        >
            {image && (
                <img
                    src={`${APIMOVIESIMAGESURL}${image}`}
                    alt={`movie poster ${title}`}
                />
            )}
            {title && (
                <div className="bg-white dark:bg-blue-500 p-6 lg:mx-0">
                    <h2 className="text-sm font-bold">{title}</h2>
                </div>
            )}
        </div>
    )
}

export default Card
