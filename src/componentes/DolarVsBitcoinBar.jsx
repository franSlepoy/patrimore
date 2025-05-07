"use client";

import useMonthly2024 from "../hooks/useMonthly2024";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];

export default function DolarVsBitcoinBar() {
  const monthly = useMonthly2024();
  const theme = useTheme();

  if (!monthly) return null;

  // Solo primeros 6 meses si aún no terminó 2024
  const chartData = MONTHS.map((m, i) => ({
    month: m,
    dolar: monthly.dolarAvg[i],
    bitcoin: monthly.btcAvg[i],
  }));

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" mb={1}>
        Dólar vs. Bitcoin – promedio mensual (CLP)
      </Typography>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="dolar"
            fill={theme.palette.primary.main}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="bitcoin"
            fill="#FFC94A"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
