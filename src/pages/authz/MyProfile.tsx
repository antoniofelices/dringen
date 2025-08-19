import { useNavigate } from '@tanstack/react-router'
import { supabase } from '@/services/supabaseService'
import ErrorApi from '@components/ui/ErrorApi'
import HeaderArticle from '@/components/ui/HeaderArticle'
import ContentArticle from '@/components/ui/ContentArticle'
import content from '@/config/data/authz/myProfile'
import { Button } from '@/components/ui/base/button'

const MyProfile = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) return <ErrorApi message={error.message} />
        navigate({ to: '/' })
    }

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <Button onClick={handleLogout}>
                    {content.textButtonSignOut}
                </Button>
            </ContentArticle>
        </>
    )
}

export default MyProfile
