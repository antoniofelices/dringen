import { useQuery } from '@tanstack/react-query'
import Loading from '@components/base/Loading'
import ErrorApi from '@components/base/ErrorApi'
import ButtonBack from '@components/base/ButtonBack'
import Tabs from '@/components/sections/Tabs'

import { getSingleHealthConsumer } from '@/services/supabaseService'
// import { APIMOVIESIMAGESURL } from '@/config/config'
// import type { PersonCreditProps, PersonMovieProps } from '@/types/interfaces'
// import { filterArrayOfObjects } from '@helpers/utils'

const SingleHealthConsumer = ({ id }: { id: string }) => {
    const {
        data: personData,
        isPending: personLoading,
        isError: personError,
        error: personErrorType,
    } = useQuery({
        queryKey: ['singlePerson', id],
        queryFn: () => getSingleHealthConsumer(id),
    })

    if (personLoading) return <Loading />

    if (personError && personErrorType)
        return <ErrorApi message={personErrorType.message} />

    // console.log(personData)

    const pfsh = personData.dn_pfsh[0]

    return (
        <>
            <article>
                <div className="grid lg:grid-cols-6 gap-7 place-content-between">
                    <div className="col-span-6">
                        <h1 className="font-extrabold">
                            {personData.user_name} {personData.user_last_name}
                        </h1>
                    </div>
                    <div className="col-span-3">
                        <h2 className="font-extrabold mb-2">General info</h2>
                        <ul className="">
                            <li>Birthday: {personData.birthday}</li>
                            <li>Gender: {personData.gender}</li>
                            <li>Birthplace: {personData.birthplace}</li>
                            <li>
                                Place of residence:{' '}
                                {personData.place_of_residence}
                            </li>
                            <li>Occupation: {personData.occupation}</li>
                        </ul>
                    </div>
                    <div className="col-span-3">
                        <div className="flex justify-between mb-2">
                            <h2 className="font-extrabold ">
                                Past Family and Social History
                            </h2>
                            <button className="text-xs">Editar</button>
                        </div>
                        <ul className="">
                            <li>Family History: {pfsh.family_history}</li>
                            <li>
                                Past Medical History:{' '}
                                {pfsh.past_medical_history}
                            </li>
                            <li>Social History: {pfsh.social_history}</li>
                        </ul>
                    </div>
                    <div className="col-span-6">
                        <h2 className="font-extrabold">
                            History of Present Illness
                        </h2>
                        Form infinito!
                    </div>
                    <div className="col-span-6">
                        <h2 className="font-extrabold">Previous revisions</h2>
                        <Tabs content={personData} />
                    </div>
                </div>
            </article>
            <ButtonBack />
        </>
    )
}

export default SingleHealthConsumer
