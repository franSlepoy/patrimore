import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../componentes/Home";
import * as api from "../../services/mindicador";
import * as hookAnnual from "../../hooks/useAnnualSeries";
import * as hookMonthly from "../../hooks/useMonthly2024";

jest.mock("../../hooks/useAnnualSeries");
jest.mock("../../hooks/useMonthly2024");
jest.spyOn(api, "getLatest");

beforeEach(() => {
  api.getLatest.mockResolvedValue({
    dolar: { valor: 900 },
    euro: { valor: 970 },
    bitcoin: { valor: 60000000 },
    ipc: { valor: 0.7 },
  });
  hookAnnual.default = () => [{ year: 2015, dolar: 900, euro: 1000 }];
  hookMonthly.default = () => ({
    dolarAvg: Array(12).fill(900),
    btcAvg: Array(12).fill(60000000),
  });
});

test("muestra tarjetas y gráfico tras cargar datos", async () => {
  render(<Home />);

  await waitFor(() => expect(screen.getByText("Dólar")).toBeInTheDocument());
  expect(
    screen.getByText(/Evolución anual de dólar/i)
  ).toBeInTheDocument();
});
