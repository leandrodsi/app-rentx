import styled, { css } from "styled-components/native";
import { BulletProps } from ".";

export const Container = styled.View<Pick<BulletProps, "active">>`
  ${({ theme, active }) => css`
    width: 6px;
    height: 6px;

    background-color: ${active ? theme.colors.title : theme.colors.shape};

    margin-left: 8px;
    border-radius: 3px;
  `}
`;
