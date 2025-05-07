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

      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 3 }}>
        El gráfico principal muestra la evolución promedio anual de cada
        indicador desde 2015. Bitcoin se representa con un eje secundario debido
        a su alto valor, mientras que el IPC se expresa en porcentaje.
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
        El IPC en Chile, o Índice de Precios al Consumidor, es un indicador
        económico que mide mensualmente la variación de precios de una canasta
        de bienes y servicios representativa del consumo de los hogares urbanos
        en Chile. Este indicador es crucial para comprender la inflación y el
        costo de vida en el país.
      </Typography>

      {/* Gráfico anual comparativo */}
      <IndicatorsChart />

      {/* Gráficos adicionales 2024 */}
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 8 }}>
        Los gráficos adicionales comparan la fortaleza mensual del peso frente
        al dólar y la relación entre el dólar y el bitcoin a lo largo de 2024.
      </Typography>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={"48%"} sx={{ width: { xs: "100%", md: "48%" } }}>
          <PesoVsDolarRadar />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "48%" },
            ml: { xs: 0, md: "4%" }, // margen solo en desktop
            mt: { xs: 2, md: 0 }, // espacio vertical en móviles
          }}
        >
          <DolarVsBitcoinBar />
        </Box>
      </Box>
    </Box>
  );
}
