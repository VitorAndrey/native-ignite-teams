import React from "react";

import { ClipboardIcon, Container, Message } from "./style";

type EmptyListProps = {
  message: string;
};

export function EmptyList({ message }: EmptyListProps) {
  return (
    <Container>
      <ClipboardIcon />
      <Message>{message}</Message>
    </Container>
  );
}
