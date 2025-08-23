import { transformToId } from '@/lib/utils'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@components/ui/base/tabs'
import ContentArticle from '@/components/ui/ContentArticle'
import HeaderArticle from '@/components/ui/HeaderArticle'
import Account from '@/components/settings/Account'
import Appearance from '@/components/settings/Appearance'
import TermsOfUse from '@/components/settings/TermsOfUse'
import content from '@/config/data/settings/settings'

const Settings = () => {
    const account = transformToId(`${content.textAccount}`)
    const appearance = transformToId(`${content.textAppearence}`)
    const textTermsOfUse = transformToId(`${content.textTermsOfUse}`)

    return (
        <>
            <HeaderArticle title={content.title} />
            <ContentArticle>
                <Tabs aria-label="Settings" defaultValue={account}>
                    <div className="flex justify-between items-center">
                        <TabsList>
                            <TabsTrigger value={account}>
                                {content.textAccount}
                            </TabsTrigger>
                            <TabsTrigger value={appearance}>
                                {content.textAppearence}
                            </TabsTrigger>
                            <TabsTrigger value={textTermsOfUse}>
                                {content.textTermsOfUse}
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value={account}>
                        <Account />
                    </TabsContent>
                    <TabsContent value={appearance}>
                        <Appearance />
                    </TabsContent>
                    <TabsContent value={textTermsOfUse}>
                        <TermsOfUse />
                    </TabsContent>
                </Tabs>
            </ContentArticle>
        </>
    )
}

export default Settings
