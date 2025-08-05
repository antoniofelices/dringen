import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import content from '@/config/data/pages/error'
import pictureColleDelleFinestre from '@/assets/images/error404-finestre.webp'
import { useIsAuth } from '@/hooks/useIsAuth'

const Error404 = () => {
    const { isLoggedIn } = useIsAuth()
    return (
        <>
            <img src={pictureColleDelleFinestre} alt={content.altimage} />
            <h1 className="max-w-2xl my-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                {content.title}
            </h1>
            <p className="max-w-2xl my-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                {content.textIntro}
            </p>
            {!isLoggedIn && (
                <Button className="mr-4">
                    <Link to="/sign-in">{content.textButtonSignIn}</Link>
                </Button>
            )}
        </>
    )
}

export default Error404
