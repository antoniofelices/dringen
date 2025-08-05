import content from '@/config/data/pages/index'
import Container from '@components/base/Container'
import { useIsAuth } from '@/hooks/useIsAuth'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const Index = () => {
    const { isLoggedIn } = useIsAuth()

    return (
        <Container>
            <section>
                <div className="grid max-w-screen-xl lg:px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            {content.title}
                        </h1>
                        <p className="max-w-2xl my-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            {content.textIntro}
                        </p>
                        {/* {!isLoggedIn && ( */}
                        <Button>
                            <Link to="/sign-in">
                                {content.textButtonSignIn}
                            </Link>
                        </Button>
                        {/* )} */}
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default Index
