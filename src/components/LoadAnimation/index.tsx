import LottieView from "lottie-react-native";
import React from "react";

import carAnimation from "../../assets/car-animation.json";

import * as S from "./styles";

const LoadAnimation = () => {
  return (
    <S.Container>
      <LottieView
        source={carAnimation}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </S.Container>
  );
};

export default LoadAnimation;
