// import type { MovieProps, PersonProps } from '@/types/interfaces'
import { apiSupabase } from '@/config/axiosConfig'

const getListHealthConsumer = async () => {
    const response = await apiSupabase.get(`/rest/v1/?select=*`)
    return response.data
}

// const getSingleUser = async (id: number): Promise<MovieProps> => {
//     const response = await apiSupabase.get(`/movie/${id}`)
//     return response.data
// }

// const getSingleHealthConsumer = async (id: number): Promise<PersonProps> => {
//     const response = await apiSupabase.get(`/person/${id}`)
//     return response.data
// }

export { getListHealthConsumer }
