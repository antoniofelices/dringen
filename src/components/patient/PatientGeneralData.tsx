import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'

const PatientGeneralData = ({ content }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold ">General info</h2>
                </CardTitle>
                <CardAction>
                    <button className="text-xs">Editar</button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ul className="">
                    <li className="my-1">
                        <span className="font-bold">Birthday</span>:{' '}
                        {content.birthday}
                    </li>
                    <li className="my-1">
                        <span className="font-bold">Gender</span>:{' '}
                        {content.gender}
                    </li>
                    <li className="my-1">
                        <span className="font-bold">Birthplace</span>:{' '}
                        {content.birthplace}
                    </li>
                    <li className="my-1">
                        <span className="font-bold">Place of residence</span>:{' '}
                        {content.place_of_residence}
                    </li>
                    <li className="my-1">
                        <span className="font-bold">Occupation</span>:{' '}
                        {content.occupation}
                    </li>
                </ul>
            </CardContent>
        </Card>
    )
}

export default PatientGeneralData
