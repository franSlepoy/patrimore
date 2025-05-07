import { useEffect, useState } from "react";
import { getIndicatorYear } from "../services/mindicador";

const INDICATORS = ["dolar", "euro", "bitcoin", "ipc"];
const YEARS = Array.from({ length: 10 }, (_, i) => 2015 + i);

const safeAverage = (arr) =>
  arr && arr.length
    ? +(arr.reduce((s, p) => s + p.valor, 0) / arr.length).toFixed(2)
    : null;

export default function useAnnualSeries() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const byYear = [];

      for (const year of YEARS) {
        const entry = { year };

        await Promise.all(
          INDICATORS.map(async (ind) => {
            try {
              const res = await getIndicatorYear(ind, year);
              entry[ind] = safeAverage(res.serie);
            } catch {
              entry[ind] = null;
            }
          })
        );

        byYear.push(entry);
      }

      setData(byYear);
    })();
  }, []);

  return data;
}
