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

const chartData = [
    { date: '11-09-25', weight: 186 },
    { date: '10-10-25', weight: 305 },
    { date: '12-19-25', weight: 237 },
    { date: '4-1-26', weight: 73 },
    { date: '9-3-26', weight: 209 },
    { date: '12-16-26', weight: 214 },
]

const PatientWeightChart = () => {
    const { clinicalHistory } = usePatientContext()
    const weightValues = clinicalHistory?.filter(
        (item) => item.person_weight != null
    )
    console.log(weightValues)

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">Weight</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="min-h-[200px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
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
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'short',
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })
                                    }}
                                />
                            }
                        />
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
