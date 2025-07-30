import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import Loading from '@components/base/Loading'
import ErrorApi from '@components/base/ErrorApi'
import ButtonBack from '@components/base/ButtonBack'
import { getListHealthConsumer } from '@/services/supabaseService'
import content from '@data/pages/listHealthConsumer'
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
                <div className="flex py-4 w-xl gap-4">{/* Filters */}</div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3">
                                    {content.userName}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {content.userLastName}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {content.dni}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link to="/">{content.edit}</Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.user_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.user_last_name}
                                    </td>
                                    <td className="px-6 py-4">{item.dni}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>
            <ButtonBack />
        </>
    )
}

export default ListHealthConsumers
