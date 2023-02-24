import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Accessory from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import Button from "../../components/Button";
import { RoutesStackParams } from "../../routes/types";
import { api } from "../../services/api";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";
import * as S from "./styles";

interface RentalPeriod {
  start: string;
  end: string;
}

const routeName = "SchedulingDetails";

type RouteCarDetails = RouteProp<RoutesStackParams, typeof routeName>;

type NavigationCarDetails = StackNavigationProp<
  RoutesStackParams,
  typeof routeName
>;

interface SchedulingDetailsProps {
  route: RouteCarDetails;
  navigation: NavigationCarDetails;
}

export const SchedulingDetails = ({
  route,
  navigation,
}: SchedulingDetailsProps) => {
  const theme = useTheme();
  const {
    params: { car, dates },
  } = route;

  const rentTotal = dates.length * car.rent.price;

  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleConfirmRental = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`schedules_bycars?id=${car.id}`);
      console.log("DATA", data);

      const unavailable_dates = data[0]?.unavailable_dates
        ? [...data[0]?.unavailable_dates, ...dates]
        : dates;

      await api.post("schedules_byuser", {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          "dd/MM/yyyy",
        ),
      });

      !!data[0]?.unavailable_dates
        ? api
            .put(`schedules_bycars/${car.id}`, {
              id: car.id,
              unavailable_dates,
            })
            .then((response) =>
              navigation.navigate("Confirmation", {
                title: "Carro alugado!",
                message:
                  "Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel",
                nextScreenRoute: "Home",
              }),
            )
            .catch((err) => {
              console.log("API1", err);
              console.log("API1", err.response);
              console.log("API1", err.response.message);
              Alert.alert("Não foi possível confirmar o agendamento");
            })
        : api
            .post(`schedules_bycars`, {
              id: car.id,
              unavailable_dates,
            })
            .then((response) =>
              navigation.navigate("Confirmation", {
                title: "Carro alugado!",
                message: "",
                nextScreenRoute: "Home",
              }),
            )
            .catch((err) => {
              console.log("API2", err);
              console.log("API2", err.response);
              console.log("API2", err.response.message);
              Alert.alert("Não foi possível confirmar o agendamento");
            });
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy",
      ),
    });
  }, []);

  return (
    <S.Container>
      <StatusBar style="dark" />
      <S.Header>
        <BackButton onPress={handleBackButton} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.Accessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              {`R$ ${car.rent.price} x${dates.length} diárias`}
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>
      <S.Footer>
        <Button
          label="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  );
};
