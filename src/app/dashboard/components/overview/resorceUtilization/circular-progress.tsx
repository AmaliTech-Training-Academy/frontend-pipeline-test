import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export function CircularProgress({ value }: { value: number }) {
  const data = [
    { name: "used", value: value },
    { name: "unused", value: 100 - value },
  ];

  return (
    <div className="relative w-24 h-24">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={45}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            stroke="none"
          >
            <Cell fill="var(--color-primary)" />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold">{value}%</span>
      </div>
    </div>
  );
}
