import { Link } from '@tanstack/react-router'
import Main from '@layouts/AuthnMain'
import { Button } from '@shared/components/ui/base/button'
import content from './Error.content'
import pictureColleDelleFinestre from '@/assets/images/error404-finestre.webp'

const Error404 = () => {
    return (
        <Main>
            <img src={pictureColleDelleFinestre} alt={content.altimage} />
            <h1 className="my-4 font-extrabold">{content.title}</h1>
            <p className="font-light lg:mb-8 ">{content.textIntro}</p>
            <Button className="mr-4">
                <Link to="/">{content.textButtonSignIn}</Link>
            </Button>
        </Main>
    )
}

export default Error404
