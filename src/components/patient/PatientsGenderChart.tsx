import { useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { chartMultipleLinesConfig } from '@/config/charts'
import { useDataGenderDate } from '@/hooks/usePatientsStadistics'
import {
    Card,
    CardAction,
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/base/select'
import content from '@data/patient/patientsCharts'

const PatientsGenderChart = () => {
    const chartData = useDataGenderDate()

    const [timeRange, setTimeRange] = useState('90d')

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date().toISOString().slice(0, 10)
        let daysToSubtract = 90
        if (timeRange === '30d') {
            daysToSubtract = 30
        } else if (timeRange === '7d') {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.titleGender}</h2>
                </CardTitle>
                <CardAction>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                            aria-label="Select a value"
                        >
                            <SelectValue
                                placeholder={
                                    content.labelOption3ChartTypeOfByDay
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                {content.labelOption1ChartTypeOfByDay}
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                {content.labelOption2ChartTypeOfByDay}
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                {content.labelOption3ChartTypeOfByDay}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartMultipleLinesConfig}
                    className="h-[200px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString('es-ES', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString('es-ES', {
                                            month: 'short',
                                            day: 'numeric',
                                        })
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey="female"
                            type="monotone"
                            stroke="var(--color-line1)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="male"
                            type="monotone"
                            stroke="var(--color-line2)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="noBinary"
                            type="monotone"
                            stroke="var(--color-line3)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    {content.textDescriptionGender}
                </div>
            </CardFooter>
        </Card>
    )
}

export default PatientsGenderChart
