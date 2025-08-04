import { useQuery } from '@tanstack/react-query'
import Loading from '@components/base/Loading'
import ErrorApi from '@components/base/ErrorApi'
import ButtonBack from '@components/base/ButtonBack'
import MedicalRecord from '@/components/health-consumer/MedicalRecord'
import Info from '@components/health-consumer/Info'
import Pfsh from '@/components/health-consumer/Pfsh'

import { getSingleHealthConsumer } from '@/services/supabaseService'
// import { APIMOVIESIMAGESURL } from '@/config/config'
// import type { PersonCreditProps, PersonMovieProps } from '@/types/interfaces'
// import { filterArrayOfObjects } from '@helpers/utils'

import { v4 as uuidv4 } from 'uuid'

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

    const pfsh = personData.dn_pfsh[0]

    console.log(uuidv4())

    return (
        <>
            <article>
                <div className="grid lg:grid-cols-6 gap-10 place-content-between">
                    <div className="col-span-6">
                        <h1 className="font-extrabold">
                            {personData.user_name} {personData.user_last_name}
                        </h1>
                    </div>
                    <div className="col-span-3">
                        <div>
                            <Info content={personData} />
                        </div>
                        <div className="mt-6">
                            <Pfsh content={pfsh} />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <MedicalRecord content={personData} />
                    </div>
                    <div className="col-span-6">
                        <h2 className="font-extrabold">
                            History of Present Illness
                        </h2>
                        Form infinito!
                    </div>
                </div>
            </article>
            <ButtonBack />
        </>
    )
}

export default SingleHealthConsumer
