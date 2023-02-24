import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import Button from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { RoutesStackParams } from "../../../routes/types";
import { api } from "../../../services/api";

import * as S from "./styles";

const routeName = "SignUpSecondStep";

type RouteSignUpSecondStep = RouteProp<RoutesStackParams, typeof routeName>;

type NavigationSignUpSecondStep = StackNavigationProp<
  RoutesStackParams,
  typeof routeName
>;

interface SignUpSecondStepProps {
  route: RouteSignUpSecondStep;
  navigation: NavigationSignUpSecondStep;
}

export const SignUpSecondStep = ({
  route,
  navigation,
}: SignUpSecondStepProps) => {
  const theme = useTheme();
  const { user } = route.params;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação.");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("As senhas não são iguais.");
    }

    await api
      .post("users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          title: "Conta criada!",
          message: "Agora é só fazer login\ne aproveitar.",
          nextScreenRoute: "SignIn",
        });
      })
      .catch(() => {
        Alert.alert("Opa", "Não foi possível cadastrar");
      });
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleGoBack} />
            <S.Steps>
              <Bullet active />
              <Bullet />
            </S.Steps>
          </S.Header>

          <S.Title>Crie sua{"\n"}conta</S.Title>
          <S.SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>2. Senha</S.FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>

          <Button
            color={theme.colors.success}
            label="Cadastrar"
            onPress={handleRegister}
          />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
