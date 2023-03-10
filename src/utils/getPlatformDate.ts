import { addDays } from "date-fns";
import { Platform } from "react-native";

export const getPlatformDate = (date: Date) => {
  return Platform.OS === "ios" ? addDays(date, 1) : date;
};
