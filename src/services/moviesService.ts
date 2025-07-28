import type { MovieProps, PersonProps } from '@/types/interfaces'

// import { apiMoviesData } from '@/config/moviesAxiosConfig'

const getListHealthConsumer = async (page: number = 1) => {
    const response = await apiMoviesData.get(
        `/discover/movie?include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`
    )
    return response.data
}

const getSingleUser = async (id: number): Promise<MovieProps> => {
    const response = await apiMoviesData.get(`/movie/${id}`)
    return response.data
}

const getSingleHealthConsumer = async (id: number): Promise<PersonProps> => {
    const response = await apiMoviesData.get(`/person/${id}`)
    return response.data
}

export { getListHealthConsumer, getSingleUser, getSingleHealthConsumer }
