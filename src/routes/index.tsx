import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/auth";
import { AppTabRoutes } from "./app.tab.routes";
import { AuthStackRoutes } from "./auth.routes";

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabRoutes /> : <AuthStackRoutes />}
    </NavigationContainer>
  );
};
