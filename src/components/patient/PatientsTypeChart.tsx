import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { chartConfig } from '@/config/charts'
import { useDataBMI } from '@/hooks/usePatientMetrics'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@components/ui/base/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@components/ui/base/chart'
import content from '@data/patient/patientCharts'

const PatientsTypeChart = () => {
    const patientDataBMI = useDataBMI()

    const dataWeightChart = patientDataBMI?.map((item) => ({
        date: item.date
            ? new Date(item.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
              })
            : '',
        bmi: item.bmi,
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.titleBMI}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="min-h-[200px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={dataWeightChart}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={8}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, -5)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            dataKey="bmi"
                            type="linear"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={true}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default PatientsTypeChart
