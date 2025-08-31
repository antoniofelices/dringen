import { Constants } from '@/types/database.types'

const SUPABASEURL = import.meta.env.VITE_SUPABASE_URL
const SUPABASEANONKEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const DIAGNOSISCERTAINTYVALUES = Constants.public.Enums.dn_diagnosis_certainty
const USERROLES = Constants.public.Enums.dn_user_role

const HEADERSCONFIG = {
    Accept: 'application/json',
    Authorization: `Bearer ${SUPABASEANONKEY}`,
}

export {
    SUPABASEURL,
    SUPABASEANONKEY,
    HEADERSCONFIG,
    DIAGNOSISCERTAINTYVALUES,
    USERROLES,
}
