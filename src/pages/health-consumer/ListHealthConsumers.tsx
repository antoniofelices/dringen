import { useQuery } from '@tanstack/react-query'
import Loading from '@components/base/Loading'
import ErrorApi from '@components/base/ErrorApi'
import ButtonBack from '@components/base/ButtonBack'
// import Card from '@/components/patterns/Card'
import { getListHealthConsumer } from '@/services/supabaseService'
// import { APIMOVIESIMAGESURL } from '@/config/config'
// import type { PersonCreditProps, PersonMovieProps } from '@/types/interfaces'
// import { filterArrayOfObjects } from '@helpers/utils'

const ListHealthConsumers = () => {
    const {
        data: listData,
        isPending: listLoading,
        isError: listError,
        error: listErrorType,
    } = useQuery({
        queryKey: ['listUsers'],
        queryFn: () => getListHealthConsumer(),
    })

    if (listLoading) return <Loading />

    if (listError && listErrorType)
        return <ErrorApi message={listErrorType.message} />

    return (
        <>
            <article>
                <div className="grid lg:grid-cols-3 gap-7 place-content-between">
                    <div className="lg:col-start-2 lg:col-end-4">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            {listData.map((item) => (
                                <span>{item.profile_id}</span>
                            ))}
                        </h1>
                    </div>
                </div>
            </article>
            <ButtonBack />
        </>
    )
}

export default ListHealthConsumers
