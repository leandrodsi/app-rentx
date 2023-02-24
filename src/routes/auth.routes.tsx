import { createStackNavigator } from "@react-navigation/stack";
import { Confirmation } from "../screens/Confirmation";

import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";
import { Splash } from "../screens/Splash";

import { AuthStackRoutesParams } from "./types";

const { Navigator, Screen } = createStackNavigator<AuthStackRoutesParams>();

export const AuthStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
};
