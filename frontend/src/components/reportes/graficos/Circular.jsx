import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data01 = [
  { name: "Group A", value: 400, fill: "red" }, // Asigna un color a Group A
  { name: "Group B", value: 300, fill: "#57F3FF" }, // Asigna un color a Group B
];

const Circular = () => {
  return (
    <ResponsiveContainer width="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={data01.fill}
          label
        />{" "}
        <Legend></Legend>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default Circular;
