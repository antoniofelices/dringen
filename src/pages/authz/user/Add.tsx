import RegisterUserForm from '@/components/user/RegisterUserForm'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import content from '@/config/data/authz/userAdd'

const Add = () => {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <RegisterUserForm />
            </CardContent>
        </Card>
    )
}

export default Add
