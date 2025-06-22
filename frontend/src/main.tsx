import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App";
import React from "react";

const queryClient = new QueryClient();

// Creates a custom Material UI theme with a blue gradient background
// and primary/secondary colors matching the gradient
const theme = createTheme({
  palette: {
    background: {
      default: "linear-gradient(135deg, #1a2b6d 0%, #4b9fe1 100%)",
    },
    primary: {
      main: "#1a2b6d",
    },
    secondary: {
      main: "#4b9fe1",
    },
    text: {
      primary: "#1a2b6d",
      secondary: "#1a2b6d",
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

/**
 * Application entry point that sets up the React root and global providers.
 * Configures:
 * - React Query for data fetching
 * - Material UI theme with custom styling
 * - CSS baseline reset
 *
 * Renders the main App component inside these providers.
 */
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
