import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import ErrorApi from '@components/base/ErrorApi'
import content from '@/config/data/authz/userSingle'
import { Button } from '@/components/ui/button'

const MyProfileUser = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) return <ErrorApi message={error.message} />
        navigate({ to: '/' })
    }

    return (
        <>
            <h1 className="mb-8">{content.title} Lorem</h1>
            <Button onClick={handleLogout}>{content.textButtonSignOut}</Button>
        </>
    )
}

export default MyProfileUser
