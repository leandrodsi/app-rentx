import { FlatList, FlatListProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { CarDTO } from "../../dtos/CarDTO";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 113px;

    background-color: ${theme.colors.header};

    justify-content: flex-end;
  `}
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px;
`;

export const TotalCars = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.primary_400};
    color: ${theme.colors.text};
  `}
`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>,
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarButtonWrapper = styled(Animated.View)`
  position: absolute;
  bottom: 13px;
  right: 22px;
`;

export const MyCarButton = styled(Animated.createAnimatedComponent(RectButton))`
  ${({ theme }) => css`
    width: 60px;
    height: 60px;

    border-radius: 30px;

    justify-content: center;
    align-items: center;

    background-color: ${theme.colors.main};

    /* position: absolute;
    bottom: 13px;
    right: 22px; */
  `}
`;
