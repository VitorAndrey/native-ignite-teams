import React from "react";

import { Container, Title, Subtitle } from "./styles";

type HighLigthProps = {
  title: string;
  subtitle: string;
};

export function HighLigth({ title, subtitle }: HighLigthProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}
