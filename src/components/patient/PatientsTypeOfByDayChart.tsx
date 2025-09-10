import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { chartAreaConfig } from '@/config/charts'
// import {
//     useDataTotalPatients,
//     useDataResidence,
// } from '@/hooks/usePatientsStadistics'
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

import { useDataTypeOfByDay } from '@hooks/usePatientsStadistics'

const chartData = [
    { date: '2024-04-01', nutritional: 222, general: 150 },
    { date: '2024-04-02', nutritional: 97, general: 180 },
    { date: '2024-04-03', nutritional: 167, general: 120 },
    { date: '2024-04-04', nutritional: 242, general: 260 },
    { date: '2024-04-05', nutritional: 373, general: 290 },
    { date: '2024-04-06', nutritional: 301, general: 340 },
    { date: '2024-04-07', nutritional: 245, general: 180 },
    { date: '2024-04-08', nutritional: 409, general: 320 },
    { date: '2024-04-09', nutritional: 59, general: 110 },
    { date: '2024-04-10', nutritional: 261, general: 190 },
    { date: '2024-04-11', nutritional: 327, general: 350 },
    { date: '2024-04-12', nutritional: 292, general: 210 },
    { date: '2024-04-13', nutritional: 342, general: 380 },
    { date: '2024-04-14', nutritional: 137, general: 220 },
    { date: '2024-04-15', nutritional: 120, general: 170 },
    { date: '2024-04-16', nutritional: 138, general: 190 },
    { date: '2024-04-17', nutritional: 446, general: 360 },
    { date: '2024-04-18', nutritional: 364, general: 410 },
    { date: '2024-04-19', nutritional: 243, general: 180 },
    { date: '2024-04-20', nutritional: 89, general: 150 },
    { date: '2024-04-21', nutritional: 137, general: 200 },
    { date: '2024-04-22', nutritional: 224, general: 170 },
    { date: '2024-04-23', nutritional: 138, general: 230 },
    { date: '2024-04-24', nutritional: 387, general: 290 },
    { date: '2024-04-25', nutritional: 215, general: 250 },
    { date: '2024-04-26', nutritional: 75, general: 130 },
    { date: '2024-04-27', nutritional: 383, general: 420 },
    { date: '2024-04-28', nutritional: 122, general: 180 },
    { date: '2024-04-29', nutritional: 315, general: 240 },
    { date: '2024-04-30', nutritional: 454, general: 380 },
    { date: '2024-05-01', nutritional: 165, general: 220 },
    { date: '2024-05-02', nutritional: 293, general: 310 },
    { date: '2024-05-03', nutritional: 247, general: 190 },
    { date: '2024-05-04', nutritional: 385, general: 420 },
    { date: '2024-05-05', nutritional: 481, general: 390 },
    { date: '2024-05-06', nutritional: 498, general: 520 },
    { date: '2024-05-07', nutritional: 388, general: 300 },
    { date: '2024-05-08', nutritional: 149, general: 210 },
    { date: '2024-05-09', nutritional: 227, general: 180 },
    { date: '2024-05-10', nutritional: 293, general: 330 },
    { date: '2024-05-11', nutritional: 335, general: 270 },
    { date: '2024-05-12', nutritional: 197, general: 240 },
    { date: '2024-05-13', nutritional: 197, general: 160 },
    { date: '2024-05-14', nutritional: 448, general: 490 },
    { date: '2024-05-15', nutritional: 473, general: 380 },
    { date: '2024-05-16', nutritional: 338, general: 400 },
    { date: '2024-05-17', nutritional: 499, general: 420 },
    { date: '2024-05-18', nutritional: 315, general: 350 },
    { date: '2024-05-19', nutritional: 235, general: 180 },
    { date: '2024-05-20', nutritional: 177, general: 230 },
    { date: '2024-05-21', nutritional: 82, general: 140 },
    { date: '2024-05-22', nutritional: 81, general: 120 },
    { date: '2024-05-23', nutritional: 252, general: 290 },
    { date: '2024-05-24', nutritional: 294, general: 220 },
    { date: '2024-05-25', nutritional: 201, general: 250 },
    { date: '2024-05-26', nutritional: 213, general: 170 },
    { date: '2024-05-27', nutritional: 420, general: 460 },
    { date: '2024-05-28', nutritional: 233, general: 190 },
    { date: '2024-05-29', nutritional: 78, general: 130 },
    { date: '2024-05-30', nutritional: 340, general: 280 },
    { date: '2024-05-31', nutritional: 178, general: 230 },
    { date: '2024-06-01', nutritional: 178, general: 200 },
    { date: '2024-06-02', nutritional: 470, general: 410 },
    { date: '2024-06-03', nutritional: 103, general: 160 },
    { date: '2024-06-04', nutritional: 439, general: 380 },
    { date: '2024-06-05', nutritional: 88, general: 140 },
    { date: '2024-06-06', nutritional: 294, general: 250 },
    { date: '2024-06-07', nutritional: 323, general: 370 },
    { date: '2024-06-08', nutritional: 385, general: 320 },
    { date: '2024-06-09', nutritional: 438, general: 480 },
    { date: '2024-06-10', nutritional: 155, general: 200 },
    { date: '2024-06-11', nutritional: 92, general: 150 },
    { date: '2024-06-12', nutritional: 492, general: 420 },
    { date: '2024-06-13', nutritional: 81, general: 130 },
    { date: '2024-06-14', nutritional: 426, general: 380 },
    { date: '2024-06-15', nutritional: 307, general: 350 },
    { date: '2024-06-16', nutritional: 371, general: 310 },
    { date: '2024-06-17', nutritional: 475, general: 520 },
    { date: '2024-06-18', nutritional: 107, general: 170 },
    { date: '2024-06-19', nutritional: 341, general: 290 },
    { date: '2024-06-20', nutritional: 408, general: 450 },
    { date: '2024-06-21', nutritional: 169, general: 210 },
    { date: '2024-06-22', nutritional: 317, general: 270 },
    { date: '2024-06-23', nutritional: 480, general: 530 },
    { date: '2024-06-24', nutritional: 132, general: 180 },
    { date: '2024-06-25', nutritional: 141, general: 190 },
    { date: '2024-06-26', nutritional: 434, general: 380 },
    { date: '2024-06-27', nutritional: 448, general: 490 },
    { date: '2024-06-28', nutritional: 149, general: 200 },
    { date: '2024-06-29', nutritional: 103, general: 160 },
    { date: '2024-06-30', nutritional: 446, general: 400 },
]

const PatientsTypeOfByDayChart = () => {
    const lorem = useDataTypeOfByDay()

    console.log(lorem)

    const [timeRange, setTimeRange] = useState('90d')

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date('2024-06-30')
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
