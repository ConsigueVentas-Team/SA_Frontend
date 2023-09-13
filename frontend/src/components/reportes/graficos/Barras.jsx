import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const CustomTooltip = ({ active, label, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white w-full h-1/2 p-3">
        <p className="label text-black font-medium">{`${label} `}</p>
        <p className="label text-black">{payload[0].value}</p>
      </div>
    );
  }

  return null;
};
const data = [
  {
    name: "Operativo",
    uv: 4000,
    Usuarios: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    Usuarios: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    Usuarios: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    Usuarios: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    Usuarios: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    Usuarios: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    Usuarios: 4300,
    amt: 2100,
  },
];

const Barras = ({ barras }) => {
  {
    return (
      <ResponsiveContainer width="100%">
        <BarChart data={data} barSize={30}>
          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip
            contentStyle={{ color: "red" }}
            content={(props) => <CustomTooltip {...props} />}
            fill="#57F3FF"
          />
          <CartesianGrid
            strokeDasharray="1 0"
            horizontal={true}
            vertical={false}
          />

          <Bar dataKey="Usuarios" fill="#57F3FF" />
          {barras == 3 && (
            <>
              <Bar dataKey="uv" fill="red" />
              <Bar dataKey="amt" fill="#24FF00" />
              <Bar dataKey="amt" fill="#FAFF00" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  }
};
export default Barras;
