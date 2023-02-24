import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface DateValueProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: ${getStatusBarHeight() + 325}px;

    background-color: ${theme.colors.header};

    justify-content: center;
    padding: ${getStatusBarHeight() + 25}px 25px 25px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.secondary_600};
    font-size: ${RFValue(34)}px;

    margin-top: 24px;
  `}
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0px;
`;

export const DateInfo = styled.View<DateValueProps>`
  ${({ theme, selected }) => css`
    width: 30%;

    ${!selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      margin-bottom: 5px;
    `}
  `}
`;

export const DateTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
  `}
`;

export const DateValue = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.shape};
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
  `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background_secondary};
  `}
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    padding: 24px;
    background-color: ${theme.colors.background_secondary};
  `}
`;
