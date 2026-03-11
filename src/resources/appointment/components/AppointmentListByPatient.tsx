import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@shared/components/ui/base/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@shared/components/ui/base/tabs'
import content from './AppointmentListByPatient.content'

const AppointmentListByPatient = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="view">
                    <TabsList>
                        <TabsTrigger value="future">
                            {content.tabFuture}
                        </TabsTrigger>
                        <TabsTrigger value="past">
                            {content.tabPast}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="future" className="mt-4">
                        Lista citas futuras
                    </TabsContent>
                    <TabsContent value="past" className="mt-4">
                        Lista citas pasadas
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default AppointmentListByPatient
