import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/base/card'
import ButtonBack from '@components/ui/ButtonBack'
import ContentArticle from '@components/ui/ContentArticle'
import content from '@/config/data/pages/accountInactive'

const AccountInactive = () => {
    return (
        <>
            <ContentArticle>
                <div className="grid grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h1>{content.title}</h1>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{content.textDescription}</p>
                        </CardContent>
                    </Card>
                </div>
            </ContentArticle>
            <ButtonBack />
        </>
    )
}

export default AccountInactive
