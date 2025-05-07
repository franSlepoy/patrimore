// src/componentes/CurrencyCard.jsx
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CurrencyCard({ label, symbol, value }) {
  return (
    <Card sx={{ minWidth: 160, textAlign: "center" }}>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h5" component="div" fontWeight={600}>
          {symbol} {value.toLocaleString("es-CL")}
        </Typography>
        <Typography color="text.secondary" fontSize={14}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
