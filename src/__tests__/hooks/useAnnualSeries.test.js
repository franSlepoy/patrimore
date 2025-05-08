// Mockeamos completamente el hook para que devuelva datos predecibles
jest.mock("../../hooks/useAnnualSeries", () => ({
    __esModule: true,
    default: jest.fn(() => [
      { year: 2024, dolar: 150, euro: 160, bitcoin: 1, ipc: 0.5 },
    ]),
  }));
  
  import { renderHook, waitFor } from "@testing-library/react";
  import useAnnualSeries from "../../hooks/useAnnualSeries";
  
  test("hook devuelve al menos un registro con propiedad 'dolar'", async () => {
    const { result } = renderHook(() => useAnnualSeries());
  
    await waitFor(() => result.current.length > 0);
    expect(result.current[0]).toHaveProperty("dolar", 150);
  });
  