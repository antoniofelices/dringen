import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'

const Pfsh = ({ content }) => {
    const firstContent = content ? content : null

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">
                        Past Family and Social History
                    </h2>
                </CardTitle>
                <CardAction>
                    <button className="text-xs">Editar</button>
                </CardAction>
            </CardHeader>
            <CardContent>
                {firstContent ? (
                    <ul className="">
                        <li className="my-2">
                            <span className="font-bold">
                                Past Medical History
                            </span>
                            : {content.past_medical_history}
                        </li>
                        <li className="my-2">
                            <span className="font-bold">Family History</span>:{' '}
                            {content.family_history}
                        </li>
                        <li className="my-2">
                            <span className="font-bold">Social History</span>:{' '}
                            {content.social_history}
                        </li>
                    </ul>
                ) : (
                    <>A form</>
                )}
            </CardContent>
        </Card>
    )
}

export default Pfsh
