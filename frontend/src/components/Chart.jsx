import React from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const Chart = ({ title, type = "bar", data = [], dataKey, valueKey }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {type === "bar" && (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={valueKey} fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        )}
        {type === "pie" && (
          <PieChart>
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={dataKey}
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
        {type === "line" && (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={valueKey}
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
