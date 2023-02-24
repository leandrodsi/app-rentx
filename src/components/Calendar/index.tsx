import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
} from "react-native-calendars";
import { useTheme } from "styled-components/native";
import { generateInterval } from "./generateInterval";
import { ptBR } from "./localeConfig";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

type DateData = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}

const Calendar = ({ markedDates, onDayPress }: CalendarProps) => {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date().toDateString()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};

export { Calendar, DateData, MarkedDateProps, generateInterval };
