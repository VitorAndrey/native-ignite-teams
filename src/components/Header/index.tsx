import React from "react";

import { BackArrow, BackButton, Container, Logo } from "./style";

import logoImg from "@assets/logo.png";

type HeaderProps = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackArrow />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
