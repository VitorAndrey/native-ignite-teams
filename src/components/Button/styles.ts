import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonStyleTypeProp = "PRIMARY" | "SECONDARY";

type StyleProps = {
  type: ButtonStyleTypeProp;
};

export const Container = styled(TouchableOpacity)<StyleProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme, type }) =>
    type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`;

export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`;
