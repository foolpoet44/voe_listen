"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

export function SentimentChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const [mounted, setMounted] = useState(false);
  const colors = ["#0b6b5e", "#f3b766", "#d97706", "#b42318"];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 min-h-[256px] w-full rounded-2xl border border-[var(--color-border)] bg-white" />
    );
  }

  return (
    <div className="h-64 min-h-[256px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
