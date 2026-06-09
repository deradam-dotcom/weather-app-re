"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

type TemperatureChartProps = {
  data: { label: string; max: number }[];
};

export const TemperatureChart = ({ data }: TemperatureChartProps) => (
  <div className="h-[177px] w-[314px] overflow-hidden rounded-[var(--radius-card)] border border-chart-border p-4 md:h-[338px] md:w-[578px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <CartesianGrid
          vertical={false}
          stroke="#ffffff"
          strokeOpacity={0.3}
          horizontalCoordinatesGenerator={({ offset }) => [
            offset.top,
            offset.top + offset.height / 2,
            offset.top + offset.height,
          ]}
        />
        <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
        <Line
          type="monotone"
          dataKey="max"
          stroke="#ffffff"
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
