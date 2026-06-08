"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
} from "recharts";

type TemperatureChartProps = {
  data: { label: string; max: number }[];
};

export function TemperatureChart({ data }: TemperatureChartProps) {
  return (
    <div className="h-44 w-full rounded-[var(--radius-card)] border border-chart-border p-4 md:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <defs>
            <linearGradient id="temperatureFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="#ffffff"
            strokeOpacity={0.3}
          />
          <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} tickCount={3} />
          <Area
            type="monotone"
            dataKey="max"
            stroke="#ffffff"
            strokeWidth={2}
            fill="url(#temperatureFill)"
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
