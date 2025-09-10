import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { chartAreaConfig } from '@/config/charts'
import { useDataTypeOfByDay } from '@/hooks/usePatientsStadistics'
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

const chartData = [
    { date: '2025-06-13', nutritional: 81, general: 130 },
    { date: '2025-06-14', nutritional: 426, general: 380 },
    { date: '2025-06-15', nutritional: 307, general: 350 },
    { date: '2025-06-16', nutritional: 371, general: 310 },
    { date: '2025-06-17', nutritional: 475, general: 520 },
    { date: '2025-06-18', nutritional: 107, general: 170 },
    { date: '2025-08-19', nutritional: 341, general: 290 },
    { date: '2025-08-20', nutritional: 408, general: 450 },
    { date: '2025-08-21', nutritional: 169, general: 210 },
    { date: '2025-08-22', nutritional: 317, general: 270 },
    { date: '2025-08-23', nutritional: 480, general: 530 },
    { date: '2025-08-24', nutritional: 132, general: 180 },
    { date: '2025-08-25', nutritional: 141, general: 190 },
    { date: '2025-08-26', nutritional: 434, general: 380 },
    { date: '2025-09-02', nutritional: 448, general: 490 },
    { date: '2025-09-03', nutritional: 149, general: 200 },
    { date: '2025-09-05', nutritional: 103, general: 160 },
    { date: '2025-09-09', nutritional: 446, general: 400 },
]

const PatientsTypeOfByDayChart = () => {
    const lorem = useDataTypeOfByDay()
    console.log(lorem)

    const [timeRange, setTimeRange] = useState('90d')

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date().toJSON().slice(0, 10)
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

export default PatientsTypeOfByDayChart
