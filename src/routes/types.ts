import { CarDTO } from "../dtos/CarDTO";

export type AuthStackRoutesParams = {
  Splash: undefined;
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: keyof AuthStackRoutesParams;
  };
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: { name: string; email: string; driverLicense: string };
  };
};

export type AppTabRoutesParams = {
  Home: undefined;
  Profile: undefined;
  MyCars: undefined;
};

export type AppStackRoutesParams = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: keyof AppStackRoutesParams;
  };
  MyCars: undefined;
};
