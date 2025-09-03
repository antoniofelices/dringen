// TODO: deleted.
// This app will never have new users signing up. The registration process is always managed by an admin user.

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import content from '@/config/data/pages/checkEmail'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/base/button'

const CheckEmail = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center pb-4">{content.text}</p>
                <Button className="w-full">
                    <Link to="/sign-in">{content.textButtonSignIn}</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default CheckEmail
