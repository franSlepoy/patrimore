import { render, screen } from "@testing-library/react";
import IndicatorsChart from "../../componentes/IndicatorsChart";
import * as hook from "../../hooks/useAnnualSeries";

// Mock del hook para controlar estados
jest.mock("../../hooks/useAnnualSeries");

test("muestra loader cuando no hay datos", () => {
  hook.default = () => [];           // sin datos
  render(<IndicatorsChart />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("renderiza título cuando llegan datos", () => {
  hook.default = () => [
    { year: 2015, dolar: 700, euro: 800, bitcoin: 1, ipc: 0.5 },
  ];
  render(<IndicatorsChart />);
  expect(
    screen.getByText(/Evolución anual de dólar/i)
  ).toBeInTheDocument();
});
