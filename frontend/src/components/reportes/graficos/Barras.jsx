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

const Barras = ({ barras, isCore }) => {
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={barras} barSize={30}>
        {isCore ? (
          <XAxis dataKey="profile_name" />
        ) : (
          <XAxis dataKey="department_name" />
        )}
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
        <Bar
          dataKey={(entry) =>
            entry.department_user_count === 0 ? 1 : entry.department_user_count
          }
          fill="#57F3FF"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barras;
