import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </SessionProvider>
    </ThemeProvider>
  );
}
