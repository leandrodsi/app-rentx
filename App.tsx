import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  useFonts,
} from "@expo-google-fonts/archivo";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { AppProvider } from "./src/hooks";
import { Routes } from "./src/routes";
import theme from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <Routes />
      </AppProvider>
    </ThemeProvider>
  );
}
