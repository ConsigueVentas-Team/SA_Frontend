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
  const departmentData = data.filter((item, index, self) =>
    self.findIndex((el) => el.department_name === item.department_name) === index
  );

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={departmentData} barSize={30}>
        <XAxis dataKey="department_name" />
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
