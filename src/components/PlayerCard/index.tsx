import React from "react";
import { Container, Icon, Name } from "./style";

type PlayerCardProps = {
  name: string;
};

export function PlayerCard({ name }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />

      <Name>{name}</Name>
    </Container>
  );
}
