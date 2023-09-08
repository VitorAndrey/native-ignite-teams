import React, { useState } from "react";

import { Container, Content, UsersTreeIcon } from "./style";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const [newGroupInput, setNewGroupInput] = useState<string>("");

  const navigation = useNavigation();

  function handleCreateGroup() {
    navigation.navigate("players", { group: newGroupInput });

    setNewGroupInput("");
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <UsersTreeIcon />

        <HighLigth title="Nova turma" subtitle="crie uma nova turma para adicionar pessoas" />

        <Input
          placeholder="Nome da Turma"
          style={{ marginBottom: 20 }}
          value={newGroupInput}
          onChangeText={setNewGroupInput}
        />

        <Button buttonText="Criar" onPress={handleCreateGroup} />
      </Content>
    </Container>
  );
}
