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

const SingleHealthConsumer = ({ id }: { id: number }) => {
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
                        <p className="max-w-2xl my-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"></p>
                    </div>
                </div>

                <h2 className="max-w-2xl my-8 text-3xl font-extrabold tracking-tight leading-none md:text-3xl">
                    Past Family and Social History
                </h2>
                <ul className="grid gap-6 auto-cols-[minmax(200px,300px)] grid-flow-col overflow-x-scroll"></ul>

                <h2 className="max-w-2xl my-8 text-3xl font-extrabold tracking-tight leading-none md:text-3xl">
                    History of Present Illness
                </h2>
                <ul className="grid gap-6 auto-cols-[minmax(200px,300px)] grid-flow-col overflow-x-scroll"></ul>
            </article>
            <ButtonBack />
        </Container>
    )
}

export default SingleHealthConsumer
