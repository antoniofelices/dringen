const Info = ({ content }) => {
    return (
        <>
            <h2 className="font-extrabold mb-2">General info</h2>
            <ul className="">
                <li>Birthday: {content.birthday}</li>
                <li>Gender: {content.gender}</li>
                <li>Birthplace: {content.birthplace}</li>
                <li>Place of residence: {content.place_of_residence}</li>
                <li>Occupation: {content.occupation}</li>
            </ul>
        </>
    )
}

export default Info
