// import { useQuery } from '@tanstack/react-query'
// import Loading from '@components/base/Loading'
// import ErrorApi from '@components/base/ErrorApi'
import Container from '@components/base/Container'
import ButtonBack from '@components/base/ButtonBack'
// import Card from '@/components/patterns/Card'
// import { getPerson } from '@/services/moviesService'
// import { APIMOVIESIMAGESURL } from '@/config/config'
// import type { PersonCreditProps, PersonMovieProps } from '@/types/interfaces'
// import { filterArrayOfObjects } from '@helpers/utils'

const ListUsers = () => {
    // const {
    //     data: personData,
    //     isPending: personLoading,
    //     isError: personError,
    //     error: personErrorType,
    // } = useQuery({
    //     queryKey: ['singlePerson', id],
    //     queryFn: () => getPerson(id),
    // })

    // if (personLoading) return <Loading />

    // if (personError && personErrorType)
    //     return <ErrorApi message={personErrorType.message} />

    return (
        <Container>
            <article>
                <div className="grid lg:grid-cols-3 gap-7 place-content-between">
                    <div className="lg:col-start-2 lg:col-end-4">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            {/* {personData.name} */}
                        </h1>
                    </div>
                </div>
            </article>
            <ButtonBack />
        </Container>
    )
}

export default ListUsers
