import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarrasAsistencia = ({ data, isCore }) => {
  const labelMap = {
    department_attendance_count: "Asistencia",
    department_absence_count: "Falta",
    department_delay_count: "Tardanza",
    department_justification_count: "Justificación",
  };

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={data} barSize={30}>
        {isCore ? (
          <XAxis dataKey="profile_name" />
        ) : (
          <XAxis dataKey="department_name" />
        )}
        <YAxis />
        <Tooltip
          formatter={(value, name) => [value, labelMap[name]]}
          labelStyle={{ color: "black", textTransform: "uppercase" }}
          contentStyle={{ fontWeight: "bold", fontSize: "16px" }}
          itemStyle={{ padding: 3, margin: 0 }}
        />
        <CartesianGrid
          strokeDasharray="1 0"
          horizontal={true}
          vertical={false}
        />
        <Bar dataKey="department_attendance_count" fill="#24ff00" />
        <Bar dataKey="department_absence_count" fill="#ff0000" />
        <Bar dataKey="department_delay_count" fill="#c8cc0a" />
        <Bar dataKey="department_justification_count" fill="#22cad6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarrasAsistencia;
