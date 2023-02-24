import React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

import * as S from "./styles";

interface Props {
  name: string;
  icon: React.FC<SvgProps>;
}

const Accessory = ({ name, icon: Icon }: Props) => {
  const theme = useTheme();

  return (
    <S.Container>
      <Icon width={32} height={32} fill={theme.colors.title} />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
};

export default Accessory;
