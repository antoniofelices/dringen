import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import ContentArticle from '@shared/components/ui/ContentArticle'
import content from './Unauthorized.content'

const Unauthorized = () => {
    return (
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
    )
}

export default Unauthorized
