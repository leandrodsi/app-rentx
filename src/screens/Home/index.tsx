// import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

// import { PanGestureHandler } from "react-native-gesture-handler";
// import {
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";
import LoadAnimation from "../../components/LoadAnimation";
import * as S from "./styles";

export const Home = ({ navigation }) => {
  // const theme = useTheme();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // const positionX = useSharedValue(0);
  // const positionY = useSharedValue(0);

  // const myCarsButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: positionX.value,
  //       },
  //       {
  //         translateY: positionY.value,
  //       },
  //     ],
  //   };
  // });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = ctx.positionX + event.translationX;
  //     positionY.value = ctx.positionY + event.translationY;
  //   },
  //   onEnd() {
  //     positionX.value = withSpring(0);
  //     positionY.value = withSpring(0);
  //   },
  // });

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate("CarDetails", { car });
  };

  // const handleOpenMyCars = () => {
  //   navigation.navigate("MyCars");
  // };

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars");

      setCars(data);
    } catch (error) {
      console.log(error);
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
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <S.TotalCars>Total de {cars.length} carros</S.TotalCars>}
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <S.MyCarButtonWrapper style={myCarsButtonStyle}>
          <S.MyCarButton onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              color={theme.colors.shape}
              size={32}
            />
          </S.MyCarButton>
        </S.MyCarButtonWrapper>
      </PanGestureHandler> */}
    </S.Container>
  );
};
