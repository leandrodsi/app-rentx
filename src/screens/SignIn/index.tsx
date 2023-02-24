import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "styled-components/native";
import * as Yup from "yup";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";

import * as S from "./styles";

export const SignIn = ({ navigation }) => {
  const theme = useTheme();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatória"),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (err) {
      console.log("SIGN IN ERROR", err);
      if (err instanceof Yup.ValidationError) {
        return Alert.alert("Opa", err.message);
      }
      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao fazer login, verifique as credenciais",
      );
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUpFirstStep");
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar style="dark" backgroundColor="transparent" translucent />
          <S.Header>
            <S.Title>Estamos{"\n"}quase lá.</S.Title>
            <S.SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </S.SubTitle>
          </S.Header>

          <S.Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </S.Form>

          <S.Footer>
            <Button
              label="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              label="Criar conta gratuita"
              onPress={handleSignUp}
              enabled={true}
              loading={false}
              color={theme.colors.background_secondary}
              light
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
