import { useEffect, useState } from "react";
import { getIndicatorYear } from "../services/mindicador";

export default function useMonthly2024() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { serie: dolarSerie } = await getIndicatorYear("dolar", 2024);
      const { serie: btcSerie } = await getIndicatorYear("bitcoin", 2024);

      // Agrupamos por mes (0‑11) y hacemos promedio mensual
      const months = Array.from({ length: 12 }, () => ({ sum: 0, n: 0 }));
      dolarSerie.forEach((p) => {
        const m = new Date(p.fecha).getMonth();
        months[m].sum += p.valor;
        months[m].n += 1;
      });
      const dolarAvg = months.map((m) => m.sum / m.n || null);

      const btcMonths = Array.from({ length: 12 }, () => ({ sum: 0, n: 0 }));
      btcSerie.forEach((p) => {
        const m = new Date(p.fecha).getMonth();
        btcMonths[m].sum += p.valor;
        btcMonths[m].n += 1;
      });
      const btcAvg = btcMonths.map((m) => m.sum / m.n || null);

      setData({ dolarAvg, btcAvg });
    })();
  }, []);

  return data; // {dolarAvg: [..12], btcAvg: [..12]}
}
