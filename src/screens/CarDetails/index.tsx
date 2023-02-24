import React from "react";
import Accessory from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import ImageSlider from "../../components/ImageSlider";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import Button from "../../components/Button";
import { AppStackRoutesParams } from "../../routes/types";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import * as S from "./styles";

const routeName = "CarDetails";

type RouteCarDetails = RouteProp<AppStackRoutesParams, typeof routeName>;

type NavigationCarDetails = StackNavigationProp<
  AppStackRoutesParams,
  typeof routeName
>;

interface CarDetailsProps {
  route: RouteCarDetails;
  navigation: NavigationCarDetails;
}

export const CarDetails = ({ route, navigation }: CarDetailsProps) => {
  const {
    params: { car },
  } = route;
  const theme = useTheme();

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleConfirmRental = () => {
    navigation.navigate("Scheduling", { car });
  };

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP,
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <S.Container>
      <Animated.View
        style={[
          headerStyleAnimation,
          {
            position: "absolute",
            overflow: "hidden",
            zIndex: 1,
            backgroundColor: theme.colors.background_secondary,
          },
        ]}
      >
        <S.Header>
          <BackButton onPress={handleBackButton} />
        </S.Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <S.CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </S.CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {car.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.Accessories>

        <S.About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </S.About>
      </Animated.ScrollView>
      <S.Footer>
        <Button
          label="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  );
};
