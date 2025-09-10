import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { chartMultipleLinesConfig } from '@/config/charts'
// import { useDataTypeOf } from '@/hooks/usePatientsStadistics'
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

const chartData = [
    { month: 'January', female: 186, male: 80, noBinary: 73 },
    { month: 'February', female: 305, male: 200, noBinary: 3 },
    { month: 'March', female: 237, male: 120, noBinary: 11 },
    { month: 'April', female: 73, male: 190, noBinary: 91 },
    { month: 'May', female: 209, male: 130, noBinary: 16 },
    { month: 'June', female: 214, male: 140, noBinary: 48 },
]

const PatientsGenderChart = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="font-extrabold">{content.titleGender}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartMultipleLinesConfig}
                    className="h-[200px] w-full"
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
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
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
