"use client";

import useAnnualSeries from "../hooks/useAnnualSeries";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { alpha } from "@mui/material";

export default function IndicatorsChart() {
  const data = useAnnualSeries();
  const theme = useTheme();

  const COLORS = {
    dolar: theme.palette.primary.main,
    euro: theme.palette.secondary.main,
    bitcoin: "#FFC94A",
    ipc: "#EF476F",
  };

  if (!data.length) return null;

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" className="title-animate">
        Evolución anual de dólar, euro, bitcoin e IPC
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Valores promedio en CLP (IPC en %)
      </Typography>

      <Box sx={{ width: "100%", height: 340 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} />

            <YAxis
              yAxisId="clp"
              tickFormatter={(v) => v.toLocaleString("es-CL")}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="btc"
              orientation="right"
              tickFormatter={(v) => (v / 1_000_000).toFixed(0) + " M"}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="ipc"
              orientation="right"
              tickFormatter={(v) => v + "%"}
              hide
            />

            <Tooltip />
            <Legend />

            {["dolar", "euro"].map((key) => (
              <Area
                key={key}
                yAxisId="clp"
                dataKey={key}
                type="monotone"
                stroke={COLORS[key]}
                fill={alpha(COLORS[key], 0.12)}
              />
            ))}

            <Area
              yAxisId="btc"
              dataKey="bitcoin"
              type="monotone"
              stroke={COLORS.bitcoin}
              fill={alpha(COLORS.bitcoin, 0.12)}
            />
            <Area
              yAxisId="ipc"
              dataKey="ipc"
              type="monotone"
              stroke={COLORS.ipc}
              fill={alpha(COLORS.ipc, 0.12)}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
