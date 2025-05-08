// src/common/Loader.jsx
import Box from "@mui/material/Box"
import { Quantum } from "ldrs/react"

export default function Loader({ height = 300 }) {
  return (
    <Box
      sx={{
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Quantum size={78} speed={1.5} color="#7C4DFF" />
    </Box>
  )
}
