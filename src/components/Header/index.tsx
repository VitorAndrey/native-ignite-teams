import React from "react";

import { BackArrow, BackButton, Container, Logo } from "./style";

import logoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate("groups");
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackArrow />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
