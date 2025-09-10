import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { chartAreaConfig } from '@/config/charts'
import { useDataTypeOfAssistanceByDay } from '@/hooks/usePatientsStadistics'
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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/base/chart'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/base/select'

import content from '@data/patient/patientsCharts'

const PatientsTypeOfByAssistanceDayChart = () => {
    const chartData = useDataTypeOfAssistanceByDay()
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
                    <h2 className="font-extrabold">{content.titleTypeOf}</h2>
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
                    config={chartAreaConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fill-area1"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-area1)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-area1)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fill-area2"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-area2)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-area2)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
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
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="general"
                            type="natural"
                            fill="url(#fill-area2)"
                            stroke="var(--color-area2)"
                            stackId="a"
                        />
                        <Area
                            dataKey="nutritional"
                            type="natural"
                            fill="url(#fill-area1)"
                            stroke="var(--color-area1)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    {content.textDescriptionChartTypeOfByDay}
                </div>
            </CardFooter>
        </Card>
    )
}

export default PatientsTypeOfByAssistanceDayChart
