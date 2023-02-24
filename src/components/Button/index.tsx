import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components/native";

import * as S from "./styles";

export interface ButtonProps extends RectButtonProps {
  label: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

const Button = ({
  label,
  color,
  loading = false,
  enabled = true,
  light = false,
  ...rest
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <S.Container color={color} enabled={enabled} {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <S.Label light={light}>{label}</S.Label>
      )}
    </S.Container>
  );
};

export default Button;
