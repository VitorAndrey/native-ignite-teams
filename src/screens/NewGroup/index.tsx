import React from "react";

import { Container, Content, UsersTreeIcon } from "./style";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <UsersTreeIcon />

        <HighLigth title="Nova turma" subtitle="crie uma nova turma para adicionar pessoas" />

        <Input placeholder="Nome da Turma" style={{ marginBottom: 20 }} />

        <Button buttonText="Criar" />
      </Content>
    </Container>
  );
}
