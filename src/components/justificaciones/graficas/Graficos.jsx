import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

export const Graficos = () => {
    const data01 = [
        {
            name: 'Group A',
            value: 400,
        },
        {
            name: 'Group B',
            value: 300,
        },
        {
            name: 'Group C',
            value: 300,
        },
        {
            name: 'Group D',
            value: 200,
        },
        {
            name: 'Group E',
            value: 278,
        },
        {
            name: 'Group F',
            value: 189,
        },
    ]
    const data02 = [
        {
            name: 'Group A',
            value: 2400,
        },
        {
            name: 'Group B',
            value: 4567,
        },
        {
            name: 'Group C',
            value: 1398,
        },
        {
            name: 'Group D',
            value: 9800,
        },
        {
            name: 'Group E',
            value: 3908,
        },
        {
            name: 'Group F',
            value: 4800,
        },
    ]

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
        },
    ]

    return (
        <>
            <PieChart width={730} height={250}>
                <Pie
                    data={data01}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={50}
                    fill='#8884d8'
                />
                <Pie
                    data={data02}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    fill='#82ca9d'
                    label
                />
            </PieChart>

            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='pv' fill='#8884d8' />
                <Bar dataKey='uv' fill='#82ca9d' />
            </BarChart>
        </>
    )
}
