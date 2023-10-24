import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Circular = ({ data }) => {
  // Extraer los valores de las categorías
  const aceptado = data[0].total_justification_aceptado || 0;
  const enProceso = data[0].total_justification_en_proceso || 0;
  const rechazado = data[0].total_justification_rechazado || 0;

  const dataForChart = [
    { name: "Aceptado", value: aceptado, fill: "green" },
    { name: "En Proceso", value: enProceso, fill: "#57F3FF" },
    { name: "Rechazado", value: rechazado, fill: "red" },
  ];

  return (
    <ResponsiveContainer width="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={dataForChart}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        />
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Circular;
