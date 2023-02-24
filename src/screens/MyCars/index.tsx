import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import LoadAnimation from "../../components/LoadAnimation";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import * as S from "./styles";

interface CarProps {
  id: string;
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export const MyCars = ({ navigation }) => {
  const theme = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const fetchCars = async () => {
    try {
      const response = await api.get("schedules_byuser?user_id=1");
      setCars(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBackButton} color={theme.colors.shape} />
        <S.Title>{`Escolha uma\ndata de início e\nfim do aluguel`}</S.Title>
        <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
      </S.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <S.Content>
          <S.Appointments>
            <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
            <S.AppointmentsQuantity>
              {cars.length.toLocaleString("pt-BR", { minimumIntegerDigits: 2 })}
            </S.AppointmentsQuantity>
          </S.Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <Car data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.text}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      )}
    </S.Container>
  );
};
