import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import Button from '@components/base/Button'
import ErrorApi from '@components/base/ErrorApi'
import content from '@data/pages/singleUser'

const SingleUser = ({ id }: { id: number }) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) return <ErrorApi message={error.message} />
        navigate({ to: '/' })
    }

    return (
        <>
            <h1 className="mb-8">{content.title} Lorem</h1>
            <Button onClick={handleLogout} text={content.textButtonSignOut} />
        </>
    )
}

export default SingleUser
