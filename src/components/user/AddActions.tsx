import { Button } from '@/components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
// import { Switch } from '@/components/ui/base/switch'
import content from '@/config/data/user/addActions'

const AddActions = () => {
    return (
        <>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>
                        <h2 className="mb-8">{content.title}</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {/* <li className="lg:flex justify-between my-4">
                            {content.textDeactiveAccount}
                            <Switch />
                        </li> */}
                        <li className="lg:flex justify-between my-4">
                            {content.textResetPassword}
                            <Button size="xs">
                                {content.textButtonResetPassword}
                            </Button>
                        </li>
                        <li className="lg:flex justify-between my-4">
                            {content.textDeleteAccount}
                            <Button size="xs" variant="destructive">
                                {content.textButtonDeleteAccount}
                            </Button>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}

export default AddActions
