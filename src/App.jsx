// src/App.jsx
import { useState, Suspense } from "react"
import {
  ThemeProvider,
  CssBaseline,
  Box,
  IconButton,
} from "@mui/material"
import { Brightness4, Brightness7 } from "@mui/icons-material"
import getTheme from "./theme"
import Home from "./componentes/Home"
import { Quantum } from "ldrs/react"
import "ldrs/react/Quantum.css"

export default function App() {
  // 👉 Modo oscuro por defecto
  const [mode, setMode] = useState("dark")
  const theme = getTheme(mode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Suspense con loader mientras se resuelven datos */}
      <Suspense
        fallback={
          <Box
            sx={{
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Quantum
              size={64}
              speed={1.75}
              color={theme.palette.primary.main}
            />
          </Box>
        }
      >
        {/* Padding lateral global */}
        <Box sx={{ px: { xs: 2, md: 4, lg: 6 }, pt:4, pb: 4 }}>
          {/* Toggle tema */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton
              color="inherit"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              sx={{ transition: "transform .4s" }}
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          {/* Página principal */}
          <Home />
        </Box>
      </Suspense>
    </ThemeProvider>
  )
}
