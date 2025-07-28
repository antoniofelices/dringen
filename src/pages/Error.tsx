import Container from '@components/base/Container'
import content from '@/data/pages/error'
import pictureColleDelleFinestre from '@/assets/images/error404-finestre.webp'
import Button from '@/components/base/Button'
import { useIsAuth } from '@/hooks/useIsAuth'

const Error404 = () => {
    const { isLoggedIn } = useIsAuth()
    return (
        <Container>
            <h1 className="max-w-2xl my-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                {content.title}
            </h1>
            <p className="max-w-2xl my-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                {content.textIntro}
            </p>
            {!isLoggedIn && (
                <Button
                    url="/sign-in"
                    classes="mr-4"
                    text={content.textButtonSignIn}
                    icon={true}
                    orientationIcon="right"
                />
            )}

            <Button
                url="/movie/list"
                text={content.textButtonMovieList}
                variant="transparent"
            />
            <img src={pictureColleDelleFinestre} alt={content.altimage} />
        </Container>
    )
}

export default Error404
