import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const data01 = [
    { name: 'Group A', value: 400, fill: 'red' }, // Asigna un color a Group A
    { name: 'Group B', value: 300, fill: '#57F3FF' }, // Asigna un color a Group B
]

export const Circular = () => {
    return (
        <PieChart width={400} height={400}>
            <Pie
                dataKey='value'
                isAnimationActive={false}
                data={data01}
                cx='25%'
                cy='25%'
                outerRadius={80}
                fill={data01.fill}
                label
            />{' '}
            <Legend></Legend>
            <Tooltip />
        </PieChart>
    )
}

const CustomTooltip = ({ active, label, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='custom-tooltip bg-white w-full h-1/2 p-3'>
                <p className='label text-black font-medium'>{`${label} `}</p>
                <p className='label text-black'>{'d'}</p>
            </div>
        )
    }

    return null
}

const data = [
    {
        name: 'Page B',
        uv: 3000,
        Usuarios: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        Usuarios: 9800,
        amt: 2290,
    },
]

export const Barras = ({ barras }) => {
    {
        return (
            <BarChart data={data} barSize={30}>
                <XAxis dataKey='name' />
                <YAxis />

                <Tooltip
                    contentStyle={{ color: 'red' }}
                    content={(props) => <CustomTooltip {...props} />}
                    fill='#57F3FF'
                />
                <CartesianGrid
                    strokeDasharray='1 0'
                    horizontal={true}
                    vertical={false}
                />

                <Bar dataKey='Usuarios' fill='#57F3FF' />
                {barras == 3 && (
                    <>
                        <Bar dataKey='uv' fill='red' />
                        <Bar dataKey='amt' fill='#24FF00' />
                        <Bar dataKey='amt' fill='#FAFF00' />
                    </>
                )}
            </BarChart>
        )
    }
}
