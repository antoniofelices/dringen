import axios from 'axios'
import { SUPABASEURL, HEADERSCONFIG } from '@/config/config'

const apiSupabase = axios.create({
    baseURL: SUPABASEURL,
    headers: HEADERSCONFIG,
    timeout: 10000,
})

// TODO: Understand why it doesn't work.
// If I use an interceptor, I would expect it to work on any instance, but it only works for the 'getMoviesByDiscover' method, the only one which doesn't have a type.
// apiMoviesData.interceptors.response.use(
//     (response) => response.data,
//     (error) => Promise.reject(error)
// )

export { apiSupabase }
