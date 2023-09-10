import React, { useState } from "react";

import { Container, Content, UsersTreeIcon } from "./style";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { createGroup } from "../../storage/group/createGroups";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [newGroupInput, setNewGroupInput] = useState<string>("");

  const navigation = useNavigation();

  async function handleCreateGroup() {
    try {
      if (newGroupInput.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      const newGroup = newGroupInput;
      const createdGroup = await createGroup(newGroup);
      navigation.navigate("players", { group: createdGroup });
      setNewGroupInput("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
        console.log(error);
      }
    }
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
          onSubmitEditing={handleCreateGroup}
          returnKeyType="done"
        />

        <Button buttonText="Criar" onPress={handleCreateGroup} />
      </Content>
    </Container>
  );
}
