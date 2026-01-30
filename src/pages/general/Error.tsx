import { Link } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import Main from '@layouts/authn/Main'
import { Button } from '@/components/ui/base/button'
import content from '@/config/data/pages/error'
import pictureColleDelleFinestre from '@/assets/images/error404-finestre.webp'

const Error404 = () => {
    const { isLoggedIn } = useAuth()
    return (
        <Main>
            <img src={pictureColleDelleFinestre} alt={content.altimage} />
            <h1 className="my-4 font-extrabold">{content.title}</h1>
            <p className="font-light lg:mb-8 ">{content.textIntro}</p>
            {!isLoggedIn && (
                <Button className="mr-4">
                    <Link to="/">{content.textButtonSignIn}</Link>
                </Button>
            )}
        </Main>
    )
}

export default Error404
