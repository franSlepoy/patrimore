"use client";

import useMonthly2024 from "../hooks/useMonthly2024";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme, alpha } from "@mui/material";

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function PesoVsDolarRadar() {
  const monthly = useMonthly2024();
  const theme = useTheme();

  if (!monthly) return null;

  // Normalizamos al índice 100 = enero
  const base = monthly.dolarAvg[0];
  const chartData = MONTHS.map((m, i) => ({
    month: m,
    peso: 100,
    dolar: ((monthly.dolarAvg[i] / base) * 100).toFixed(1),
  }));

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" mb={1}>
        Peso chileno vs. dólar – 2024 (índice 100 = ene)
      </Typography>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={chartData}>
          <PolarAngleAxis dataKey="month" />
          <PolarGrid radialLines={false} />
          <Tooltip />
          <Radar
            name="Peso CLP"
            dataKey="peso"
            stroke={theme.palette.secondary.main}
            fill={alpha(theme.palette.secondary.main, 0.1)}
          />
          <Radar
            name="Dólar"
            dataKey="dolar"
            stroke={theme.palette.primary.main}
            fill={alpha(theme.palette.primary.main, 0.1)}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
