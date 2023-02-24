import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { ButtonProps } from ".";

export const Container = styled(RectButton)<
  Pick<ButtonProps, "color" | "loading">
>`
  ${({ theme, color, loading, enabled }) => css`
    width: 100%;

    margin-bottom: 8px;
    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${color || theme.colors.main};
    opacity: ${enabled || loading ? 1 : 0.5};
  `}
`;

export const Label = styled.Text<Pick<ButtonProps, "light">>`
  ${({ theme, light }) => css`
    font-family: ${theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${light ? theme.colors.header : theme.colors.shape};
  `}
`;
