import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTheme } from "styled-components/native";

import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import * as S from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export const PasswordInput = ({ iconName, value, ...rest }: InputProps) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <S.Container>
      <S.IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </S.IconContainer>

      <S.InputText
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        autoCapitalize="none"
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <S.IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </S.IconContainer>
      </BorderlessButton>
    </S.Container>
  );
};
