import React from "react";

import { Container, Message } from "./style";

type EmptyListProps = {
  message: string;
};

export function EmptyList({ message }: EmptyListProps) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}
