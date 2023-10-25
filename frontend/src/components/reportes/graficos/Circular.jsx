import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Circular = ({ primero, segundo, tercero }) => {

  // Extraer los valores de las categorías
  const aceptado = primero;
  const enProceso = segundo;
  const rechazado = tercero;

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
