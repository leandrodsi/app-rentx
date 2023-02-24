import React from "react";
import { useWindowDimensions } from "react-native";

import * as S from "./styles";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DoneSvg from "../../assets/done.svg";
import LogoSvg from "../../assets/logo_background_gray.svg";
import ConfirmButton from "../../components/ConfirmButton";
import { RoutesStackParams } from "../../routes/types";

const routeName = "Confirmation";

type RouteConfirmation = RouteProp<RoutesStackParams, typeof routeName>;

type NavigationConfirmation = StackNavigationProp<
  RoutesStackParams,
  typeof routeName
>;

interface ConfirmationProps {
  route: RouteConfirmation;
  navigation: NavigationConfirmation;
}

export const Confirmation = ({ route, navigation }: ConfirmationProps) => {
  const { title, message, nextScreenRoute } = route.params;
  const { width } = useWindowDimensions();

  const handleConfirm = () => {
    navigation.navigate(nextScreenRoute);
  };

  return (
    <S.Container>
      <LogoSvg width={width} />

      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton label="OK" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
};
