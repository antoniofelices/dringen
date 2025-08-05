import { Card } from 'flowbite-react'

const Pfsh = ({ content }) => {
    return (
        <Card className="">
            <div className="flex justify-between mb-2">
                <h2 className="font-extrabold ">
                    Past Family and Social History
                </h2>
                <button className="text-xs">Editar</button>
            </div>
            <ul className="">
                <li className="my-2">
                    <span className="font-bold">Past Medical History</span>:{' '}
                    {content.past_medical_history}
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
        </Card>
    )
}

export default Pfsh
