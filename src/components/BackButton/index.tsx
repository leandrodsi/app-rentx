import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { BorderlessButtonProps } from "react-native-gesture-handler";

import { useTheme } from "styled-components/native";
import * as S from "./styles";

interface Props extends BorderlessButtonProps {
  color?: string;
}

export const BackButton = ({ color, ...rest }: Props) => {
  const theme = useTheme();

  return (
    <S.Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color || theme.colors.text}
      />
    </S.Container>
  );
};
