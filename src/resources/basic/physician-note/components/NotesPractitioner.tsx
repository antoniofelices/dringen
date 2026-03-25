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
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
} from '@shared/components/ui/base/item'
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
                <Item>
                    <ItemContent>
                        <ItemTitle>
                            Call the guy who is in charge of that mess. This
                            morning!
                        </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <button onClick={() => {}}>
                            <CircleX size="20" />
                        </button>
                    </ItemActions>
                </Item>
                <Item className="mt-4">
                    <ItemContent>
                        <ItemTitle>
                            Ask Eloisa about Chris Christopherson's condition.
                            He was involved in a serious cardiac obstruction
                            last night, underwent surgery and his recovery was
                            extremely delicate.
                        </ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <button onClick={() => {}}>
                            <CircleX size="20" />
                        </button>
                    </ItemActions>
                </Item>
            </CardContent>
        </Card>
    )
}

export default NotesPractitioner
