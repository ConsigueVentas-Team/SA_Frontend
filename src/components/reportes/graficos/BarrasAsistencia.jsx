import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const labelMap = {
  department_attendance_count: "Asistencia",
  department_absence_count: "Falta",
  department_delay_count: "Tardanza",
  department_justification_count: "Justificación", 
};

const BarrasAsistencia = ({ barras }) => {  
  let barDataKey1 = "department_attendance_count";
  let barDataKey2 = "department_absence_count";
  let barDataKey3 = "department_delay_count";
  let barDataKey4 = "department_justification_count";
 
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={barras} barSize={30}>
        <XAxis
          dataKey='department_name'
          tickFormatter={(value) => {
            const words = value.split(" ");
            if (words.length > 1) {
              return `${words[0].slice(0, 3)}. ${words.slice(1).join(" ")}`;
            }
            return value;
          }}
        />
        <YAxis />
        <Legend formatter={(name)=>[labelMap[name]]}/>
        <Tooltip
          formatter={(value, name) => [value, labelMap[name]]
        }
          labelStyle={{ color: "black", textTransform: "uppercase" }}
          contentStyle={{ fontWeight: "bold", fontSize: "16px" }}
          itemStyle={{ padding: 3, margin: 0 }}
        />
        <CartesianGrid
          strokeDasharray="1 0"
          horizontal={true}
          vertical={false}
        />
        <Bar dataKey={barDataKey1} background={{fill: '#1e2e39'}} fill="#24ff00" />
        <Bar dataKey={barDataKey2} background={{fill: '#1e2e39'}} fill="#ff0000" />
        <Bar dataKey={barDataKey3} background={{fill: '#1e2e39'}} fill="#c8cc0a" />
        <Bar dataKey={barDataKey4} background={{fill: '#1e2e39'}} fill="#22cad6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarrasAsistencia;
