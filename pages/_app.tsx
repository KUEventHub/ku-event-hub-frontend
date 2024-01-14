import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MaterialDesignContent, SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#006664",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B2BB1C",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Kanit, sans-serif",
    fontWeightMedium: "bold",
  },
});

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#B2BB1C",
  },
}));

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        Components={{
          success: StyledMaterialDesignContent,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <Navbar>
              <Component {...pageProps} />
            </Navbar>
          </SessionProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
