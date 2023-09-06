import React from "react";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <HighLigth title="Nome da turma" subtitle="adicione a galera e separe os times" />

      <Input placeholder="Nome da pessoa" autoCorrect={false} />
      <ButtonIcon icon="add" />
    </Container>
  );
}
