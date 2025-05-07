// src/componentes/Home.jsx
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CurrencyCard from "./CurrencyCard";

import { getLatest } from "../services/mindicador";
import IndicatorsChart from "./IndicatorsChart";
import PesoVsDolarRadar from "./PesoVsDolarRadar";
import DolarVsBitcoinBar from "./DolarVsBitcoinBar";

export default function Home() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    getLatest().then(setLatest);
  }, []);

  if (!latest) return null;

  return (
    <Box>
      <Typography variant="h3" className="title-animate" gutterBottom>
        Desafío Técnico
      </Typography>

      <Typography
        variant="subtitle1"
        className="subtitle-animate"
        sx={{ mb: 4 }}
        color="text.secondary"
      >
        Valores actuales respecto al peso chileno (fuente: mindicador.cl)
      </Typography>

      {/* Tarjetas de indicadores actuales */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mb: 6,
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        }}
      >
        <CurrencyCard label="Dólar" symbol="$" value={latest.dolar.valor} />
        <CurrencyCard label="Euro" symbol="€" value={latest.euro.valor} />
        <CurrencyCard label="Bitcoin" symbol="₿" value={latest.bitcoin.valor} />
        
      </Box>

      {/* Gráfico anual comparativo */}
      <IndicatorsChart />

      {/* Gráficos adicionales 2024 */}
      <Box display={"flex"}>
        <Box width={"48%"}>
          <PesoVsDolarRadar />
        </Box>
        <Box width={"48%"} sx={{ ml: "4%" }}>
          <DolarVsBitcoinBar />
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, maxWidth: 640 }}
      >
        El gráfico principal muestra la evolución promedio anual de cada
        indicador desde 2015. Bitcoin se representa con un eje secundario debido
        a su alto valor, mientras que el IPC se expresa en porcentaje. Los
        gráficos adicionales comparan la fortaleza mensual del peso frente al
        dólar y la relación entre el dólar y el bitcoin a lo largo de 2024.
      </Typography>
    </Box>
  );
}
