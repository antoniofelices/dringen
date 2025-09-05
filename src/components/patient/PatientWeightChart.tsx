import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { chartConfig } from '@/config/charts'
import { usePatientContext } from '@/hooks/usePatientContext'
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

const PatientWeightChart = () => {
    const { clinicalHistoryNutritional } = usePatientContext()

    const dataWeightChart = clinicalHistoryNutritional?.map((item) => ({
        date: item.date
            ? new Date(item.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
              })
            : '',
        weight: item.weight,
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.titleWeight}</h2>
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
                            dataKey="weight"
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

export default PatientWeightChart
