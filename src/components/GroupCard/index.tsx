import React from "react";

import { TouchableOpacityProps } from "react-native";

import { Container, UsersTreeIcon, Title } from "./style";
import { Group } from "@screens/Groups";

type GroupCardProps = TouchableOpacityProps & {
  group: Group;
};

export function GroupCard({ group, ...rest }: GroupCardProps) {
  const { name } = group;

  return (
    <Container {...rest}>
      <UsersTreeIcon />
      <Title>{name}</Title>
    </Container>
  );
}
