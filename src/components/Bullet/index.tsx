import React from "react";

import * as S from "./styles";

export interface BulletProps {
  active?: boolean;
}

export const Bullet = ({ active = false }: BulletProps) => {
  return <S.Container active={active} />;
};
