import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import * as Yup from "yup";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import Button from "../../../components/Button";
import { Input } from "../../../components/Input";
import { RoutesStackParams } from "../../../routes/types";

import * as S from "./styles";

const routeName = "SignUpFirstStep";

type NavigationCarDetails = StackNavigationProp<
  RoutesStackParams,
  typeof routeName
>;

interface SignUpFirstStepProps {
  navigation: NavigationCarDetails;
}

export const SignUpFirstStep = ({ navigation }: SignUpFirstStepProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        email: Yup.string()
          .email("E-mail inválido")
          .required("E-mail é obrigatório"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return Alert.alert("Opa", err.message);
      }
    }
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
            <S.FormTitle>1. Dados</S.FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </S.Form>

          <Button label="Próximo" onPress={handleNextStep} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
