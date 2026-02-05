// import { useNavigate } from '@tanstack/react-router'
// import { toast } from 'sonner'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import content from './ActionsPractitioner.content'

const ActionsPractitioner = () => {
    const handleResetPassword = () => {
        return
    }

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
                        <li className="lg:flex justify-between my-4">
                            {content.textResetPassword}
                            <Button size="xs" onClick={handleResetPassword}>
                                {content.textButtonResetPassword}
                            </Button>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}

export default ActionsPractitioner
