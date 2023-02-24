import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";

import * as S from "./styles";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import ArrowSvg from "../../assets/arrow.svg";
import Button from "../../components/Button";
import {
  Calendar,
  DateData,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";
import { RoutesStackParams } from "../../routes/types";
import { getPlatformDate } from "../../utils/getPlatformDate";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

const routeName = "Scheduling";

type RouteCarDetails = RouteProp<RoutesStackParams, typeof routeName>;

type NavigationCarDetails = StackNavigationProp<
  RoutesStackParams,
  typeof routeName
>;

interface SchedulingProps {
  route: RouteCarDetails;
  navigation: NavigationCarDetails;
}

export const Scheduling = ({ route, navigation }: SchedulingProps) => {
  const theme = useTheme();
  const {
    params: { car },
  } = route;

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleConfirmRental = () => {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  };

  const handleChangeDate = (date: DateData) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy",
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  };

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBackButton} color={theme.colors.shape} />
        <S.Title>{`Escolha uma\ndata de início e\nfim do aluguel`}</S.Title>

        <S.RentalPeriod>
          <S.DateInfo selected={!!rentalPeriod.startFormatted}>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.startFormatted}</S.DateValue>
          </S.DateInfo>

          <ArrowSvg />

          <S.DateInfo selected={!!rentalPeriod.endFormatted}>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.endFormatted}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </S.Content>
      <S.Footer>
        <Button
          label="Confirmar"
          enabled={!!rentalPeriod.endFormatted}
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  );
};
