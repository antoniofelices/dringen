import { useState } from 'react'
import { Button } from '@shared/components/ui/base/button'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
} from '@shared/components/ui/base/drawer'
import ButtonBack from '@shared/components/ui/ButtonBack'
import ContentArticle from '@shared/components/ui/ContentArticle'
import HeaderArticle from '@shared/components/ui/HeaderArticle'
import content from './SinglePatient.content'

const SinglePatient = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <HeaderArticle title="Patient name">
                <Button asChild size="sm">
                    <DrawerTrigger>
                        {content.textButtonAddClinicalHistory}
                    </DrawerTrigger>
                </Button>
            </HeaderArticle>
            <ContentArticle>
                <div className="grid lg:grid-cols-6 gap-6 place-content-between">
                    <div className="col-span-3">
                        Genral data: name, address, etc
                    </div>
                    <div className="col-span-3">Anemesis</div>
                    <div className="col-span-6">Clinical History</div>
                    <div className="col-span-6">Analysis</div>
                    <DrawerOverlay className="bg-black/60" />
                    <DrawerContent className="sm:max-w-6xl sm:m-auto sm:px-6 min-h-[80vh] border border-gray-300 dark:border-gray-800 dark:bg-black">
                        <DrawerHeader className="sr-only">
                            <DrawerTitle>
                                {content.textPresentIllnes}
                            </DrawerTitle>
                            <DrawerDescription className="sr-only">
                                {content.textPesentIllnesForm}
                            </DrawerDescription>
                        </DrawerHeader>
                    </DrawerContent>
                </div>
            </ContentArticle>
            <ButtonBack />
        </Drawer>
    )
}

export default SinglePatient
