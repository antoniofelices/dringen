import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import content from '@/config/data/authn/checkEmail'

const CheckEmail = () => {
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    )
}

export default CheckEmail
