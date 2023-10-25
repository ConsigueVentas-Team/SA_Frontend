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

const BarrasAsistencia = ({ data }) => {
  let xAxisDataKey;

  if (data.length > 3) {
    xAxisDataKey = "core_name";
  }else{
    xAxisDataKey = "department_name";
  }

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={data} barSize={30}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="1 0" horizontal={true} vertical={false} />

        <Bar dataKey="department_attendance_count" fill="#57F3FF" />
        <Bar dataKey="department_absence_count" fill="#FF5733" />
        <Bar dataKey="department_delay_count" fill="#24FF00" />
        <Bar dataKey="department_justification_count" fill="#FAFF00" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarrasAsistencia;