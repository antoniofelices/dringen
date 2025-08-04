const Pfsh = ({ content }) => {
    return (
        <>
            <div className="flex justify-between mb-2">
                <h2 className="font-extrabold ">
                    Past Family and Social History
                </h2>
                <button className="text-xs">Editar</button>
            </div>
            <ul className="">
                <li>Family History: {content.family_history}</li>
                <li>Past Medical History: {content.past_medical_history}</li>
                <li>Social History: {content.social_history}</li>
            </ul>
        </>
    )
}

export default Pfsh
