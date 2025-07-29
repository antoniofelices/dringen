const SUPABASEURL = import.meta.env.VITE_SUPABASE_URL
const SUPABASEANONKEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const HEADERSCONFIG = {
    Accept: 'application/json',
    Authorization: `Bearer ${SUPABASEANONKEY}`,
}

export { SUPABASEURL, SUPABASEANONKEY, HEADERSCONFIG }
