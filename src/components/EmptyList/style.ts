import { Clipboard } from "phosphor-react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const ClipboardIcon = styled(Clipboard).attrs(({ theme }) => ({
  size: 40,
  color: theme.COLORS.GRAY_300,
}))`
  margin-top: -25%;
`;

export const Message = styled.Text`
  text-align: center;

  max-width: 150px;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `}
`;
