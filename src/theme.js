import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ['none', '0 3px 5px rgba(0,0,0,0.1)', '0 1px 18px rgba(0,0,0,0.12)'],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
