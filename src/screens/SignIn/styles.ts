import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    padding: 0 24px;

    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 116}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(40)}px;
    font-family: ${theme.fonts.secondary_600};
    color: ${theme.colors.title};
  `}
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.primary_400};
    color: ${theme.colors.text};
    line-height: ${RFValue(25)}px;

    margin-top: 16px;
  `}
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0;
`;

export const Footer = styled.View``;
