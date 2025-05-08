import axios from "axios";
import { getLatest, getIndicatorYear } from "../../services/mindicador";

jest.mock("axios");

describe("mindicador service", () => {
  it("llama a la URL base en getLatest", async () => {
    axios.get.mockResolvedValueOnce({ data: { dolar: { valor: 1000 } } });
    await getLatest();
    expect(axios.get).toHaveBeenCalledWith("https://mindicador.cl/api", { params: {} });
  });

  it("construye la URL correcta con getIndicatorYear", async () => {
    axios.get.mockResolvedValueOnce({ data: { serie: [] } });
    await getIndicatorYear("dolar", 2024);
    expect(axios.get).toHaveBeenCalledWith(
      "https://mindicador.cl/api/dolar/2024",
      { params: {} }
    );
  });
});
