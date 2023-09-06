import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonStyleTypeProp, ButtonText, Container } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  buttonText: string;
  type?: ButtonStyleTypeProp;
};

export function Button({ type = "PRIMARY", buttonText, ...rest }: ButtonProps) {
  return (
    <Container type={type} {...rest}>
      <ButtonText>{buttonText}</ButtonText>
    </Container>
  );
}
