import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import { Button } from '@/components/ui/base/button'
import ErrorApi from '@components/ui/ErrorApi'
import content from '@data/ui/buttonSignOut'

const ButtonSignOut = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) return <ErrorApi message={error.message} />
        navigate({ to: '/' })
    }

    return <Button onClick={handleLogout}>{content.textButton}</Button>
}

export default ButtonSignOut
