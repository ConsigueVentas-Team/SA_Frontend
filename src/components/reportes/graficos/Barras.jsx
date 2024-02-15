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

const Barras = ({ barras, isCore, isDepart }) => {
  let xAxisDataKey = "department_name";
  let barDataKey = "department_user_count";

  if (isDepart && !isCore) {
    xAxisDataKey = "core_name";
    barDataKey = "core_user_count";
    const uniqueData = [];
    const existingValues = new Set();

    for (const entry of barras) {
      const value = entry[xAxisDataKey];
      if (!existingValues.has(value)) {
        existingValues.add(value);
        uniqueData.push(entry);
      }
    }

    barras = uniqueData;
  } else if (isDepart && isCore) {
    xAxisDataKey = "profile_name";
    barDataKey = "profile_user_count";
  }

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={barras} barSize={30}>
        <XAxis
          dataKey={xAxisDataKey}
          tickFormatter={(value) => {
            const words = value.split(" ");
            if (words.length > 1) {
              return `${words[0].slice(0, 3)}. ${words.slice(1).join(" ")}`;
            }
            return value;
          }}
        />
        <YAxis />

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
          dataKey={(entry) => (entry[barDataKey] === 0 ? 0 : entry[barDataKey])}
          fill="#57F3FF"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barras;
