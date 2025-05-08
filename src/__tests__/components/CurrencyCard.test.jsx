import { render, screen } from "@testing-library/react";
import CurrencyCard from "../../componentes/CurrencyCard";

test("muestra símbolo y valor formateado", () => {
  render(<CurrencyCard label="Dólar" symbol="$" value={1234.56} />);

  // Acepta ambos formatos: 1,234.56 (en‑US) o 1.234,56 (es‑CL)
  expect(
    screen.getByText((content) => /\$.*1[.,]234[.,]56/.test(content))
  ).toBeInTheDocument();

  expect(screen.getByText("Dólar")).toBeInTheDocument();
});
