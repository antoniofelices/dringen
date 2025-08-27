import { Card, CardContent } from '@/components/ui/base/card'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import RegisterHealthConsumerForm from '@/components/health-consumer/RegisterHealthConsumerForm'
import content from '@/config/data/health-consumer/add'

const AddHealthConsumer = () => {
    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <CardContent>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent>
                            <RegisterHealthConsumerForm />
                        </CardContent>
                    </Card>
                </CardContent>
            </ContentArticle>
        </>
    )
}

export default AddHealthConsumer
