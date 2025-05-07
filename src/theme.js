import { createTheme, alpha } from "@mui/material/styles";

export const chartColors = (theme) => ({
  dolar: theme.palette.primary.main,
  euro: theme.palette.secondary.main,
  bitcoin: "#FFC94A",
  ipc: "#EF476F",
});

export default function getTheme(mode = "light") {
  return createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#7C4DFF" : "#B39DFF" },
      secondary: { main: mode === "light" ? "#512DA8" : "#9575CD" },
      background: {
        default: mode === "light" ? "#fafafa" : "#121212",
        paper: mode === "light" ? "#ffffffcc" : "#1e1e1ecc", // translucidez
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: { root: { backdropFilter: "blur(6px)" } },
      },
    },
  });
}
