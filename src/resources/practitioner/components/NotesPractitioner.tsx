import { CircleX } from 'lucide-react'
import { Button } from '@shared/components/ui/base/button'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@shared/components/ui/base/alert'
import content from './NotesPractitioner.content'

const NotesPractitioner = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
                <CardAction>
                    <Button size="xs" variant="outline" onClick={() => {}}>
                        <>{content.textButtonEdit}</>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Alert>
                    <CircleX />
                    <AlertDescription>
                        Call the guy who is in charge of that mess. This
                        morning!
                    </AlertDescription>
                </Alert>
                <Alert className="mt-4">
                    <CircleX />
                    <AlertDescription>
                        Ask Eloisa about Chris Christopherson's condition. He
                        was involved in a serious cardiac obstruction last
                        night, underwent surgery and his recovery was extremely
                        delicate.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}

export default NotesPractitioner
