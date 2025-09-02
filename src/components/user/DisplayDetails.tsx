import { transformDate } from '@/lib/utils'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import content from '@/config/data/user/displayDetails'

const DisplayDetails = ({ personData }) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="mb-8">{content.title}</h2>
                    </CardTitle>
                    <CardAction>
                        <button className="text-xs">Editar</button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li className="my-2">
                            {content.labelUserName}: {personData.user_name}{' '}
                            {personData.user_last_name}
                        </li>
                        <li className="my-2">
                            {content.labelRole}: {personData.role}
                        </li>
                        <li className="my-2">
                            {content.labelEmail}: {personData.email}
                        </li>
                        <li className="my-2">
                            {content.labelCreatedAt}:{' '}
                            {transformDate(`${personData.created_at}`)}
                        </li>
                        <li className="my-2">
                            {content.labelUpdatedAt}:{' '}
                            {transformDate(`${personData.updated_at}`)}
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}

export default DisplayDetails
