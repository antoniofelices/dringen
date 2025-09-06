import { Label, Pie, PieChart } from 'recharts'
import { chartPieConfig } from '@/config/charts'
import {
    useDataTotalPatients,
    useDataResidence,
} from '@/hooks/usePatientsStadistics'
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

const PatientsResidenceChart = () => {
    const totalPatients = useDataTotalPatients()
    const patientsResidences = useDataResidence()

    const dataResidencesChart = patientsResidences.map((item, index) => {
        const chartKey =
            `var(--color-area${(index % 7) + 1})` as keyof typeof chartPieConfig
        return { ...item, fill: chartKey }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.titleResidence}</h2>
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
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={dataResidencesChart}
                            dataKey="quantity"
                            nameKey="residence"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="text-3xl font-bold dark:fill-white"
                                                >
                                                    {totalPatients?.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="dark:fill-white"
                                                >
                                                    {content.textChartResidence}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    {content.textDescribeChartResidence}
                </div>
            </CardFooter>
        </Card>
    )
}

export default PatientsResidenceChart
