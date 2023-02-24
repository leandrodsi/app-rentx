import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTheme } from "styled-components/native";

import { TextInputProps } from "react-native";
import * as S from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export const Input = ({ iconName, value, ...rest }: InputProps) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return (
    <S.Container>
      <S.IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          isFocused={isFocused}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </S.IconContainer>

      <S.InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </S.Container>
  );
};
