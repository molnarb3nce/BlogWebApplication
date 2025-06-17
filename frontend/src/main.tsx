import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App";

const queryClient = new QueryClient();

// Egyedi MUI téma létrehozása
const theme = createTheme({
  palette: {
    background: {
      default: "linear-gradient(135deg, #1a2b6d 0%, #4b9fe1 100%)", // Kék gradiens háttér
    },
    primary: {
      main: "#1a2b6d", // Sötétkék
    },
    secondary: {
      main: "#4b9fe1", // Világoskék
    },
    text: {
      primary: "#1a2b6d", // Sötétkék szöveg
      secondary: "#1a2b6d", // Halványkék szöveg
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a2b6d 0%, #4b9fe1 100%)",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
