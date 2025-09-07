import { Pie, PieChart } from 'recharts'
import { chartPieConfig } from '@/config/charts'
import { useDataTypeOf } from '@/hooks/usePatientsStadistics'
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
    CardTitle,
} from '@components/ui/base/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@components/ui/base/chart'
import content from '@data/patient/patientsCharts'

const PatientsTypeOfChart = () => {
    const patientsResidences = useDataTypeOf()

    const dataTypeOfChart = patientsResidences.map((item, index) => {
        const chartKey =
            `var(--color-area${(index % 7) + 1})` as keyof typeof chartPieConfig
        return { ...item, fill: chartKey }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.titleTypeOf}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartPieConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Pie
                            data={dataTypeOfChart}
                            dataKey="quantity"
                            nameKey="type"
                        ></Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    {content.textDescriptionChartTypeOf}
                </div>
            </CardFooter>
        </Card>
    )
}

export default PatientsTypeOfChart
