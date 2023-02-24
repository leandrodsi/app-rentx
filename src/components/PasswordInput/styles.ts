import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  ${({ theme, isFocused }) => css`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;

    margin-right: 2px;

    background-color: ${theme.colors.background_secondary};

    ${isFocused &&
    css`
      border-color: ${theme.colors.main};
      border-bottom-width: 2px;
    `}
  `}
`;

export const InputText = styled.TextInput<Props>`
  ${({ theme, isFocused }) => css`
    flex: 1;

    background-color: ${theme.colors.background_secondary};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    padding: 0 23px;

    ${isFocused &&
    css`
      border-color: ${theme.colors.main};
      border-bottom-width: 2px;
    `}
  `}
`;
