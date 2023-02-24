import { createStackNavigator } from "@react-navigation/stack";
import { CarDetails } from "../screens/CarDetails";
import { Confirmation } from "../screens/Confirmation";

import { Home } from "../screens/Home";
import { Scheduling } from "../screens/Scheduling";

import { SchedulingDetails } from "../screens/SchedulingDetails";
import { AppStackRoutesParams } from "./types";

const { Navigator, Screen } = createStackNavigator<AppStackRoutesParams>();

export const AppStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
};
