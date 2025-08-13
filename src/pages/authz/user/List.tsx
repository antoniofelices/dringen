import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import Loading from '@components/ui/Loading'
import ErrorApi from '@components/ui/ErrorApi'
import ButtonBack from '@components/ui/ButtonBack'
import { getListUsers } from '@/services/supabaseService'
import content from '@/config/data/authz/userList'

const List = () => {
    const {
        data: listData,
        isPending: listLoading,
        isError: listError,
        error: listErrorType,
    } = useQuery({
        queryKey: ['listUsers'],
        queryFn: () => getListUsers(),
    })

    const navigate = useNavigate()

    if (listLoading) return <Loading />

    if (listError && listErrorType)
        return <ErrorApi message={listErrorType.message} />

    console.log(listData)

    return (
        <>
            <article>
                <div className="flex py-4 w-xl gap-4">{/* Filters */}</div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className="text-xs bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3">
                                    {content.userName}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {content.userLastName}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {content.role}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button
                                            onClick={() =>
                                                navigate({
                                                    to: `/user/${item.id}`,
                                                })
                                            }
                                            role="button"
                                        >
                                            {content.edit}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.user_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.user_last_name}
                                    </td>
                                    <td className="px-6 py-4">{item.role}</td>
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

export default List
