import { transformToId } from '@shared/utils/utils'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import ButtonSignOut from '@shared/components/ui/ButtonSignOut'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import Account from '@resources/practitioner/components/Account'
import Appearance from '@resources/practitioner/components/Appearance'
import TermsOfUse from '@resources/practitioner/components/TermsOfUse'
import content from './Settings.content'

const Settings = () => {
    const account = transformToId(`${content.textAccount}`)
    const appearance = transformToId(`${content.textAppearence}`)
    const textTermsOfUse = transformToId(`${content.textTermsOfUse}`)

    return (
        <>
            <HeaderArticle title={content.title}>
                <ButtonSignOut size="sm" />
            </HeaderArticle>
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
