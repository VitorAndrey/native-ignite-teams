import React, { useState } from "react";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { GroupCard } from "@components/GroupCard";
import { FlatList } from "react-native";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

export type Group = {
  id: string;
  name: string;
  // size?: number;
  // integrants?: string[]
};

export function Groups() {
  const [groups, setGroups] = useState<Group[] | []>([
    // { id: "1", name: "Grupo Feliz" },
    //{ id: "2", name: "Grupo Triste" },
  ]);

  return (
    <Container>
      <Header />

      <HighLigth title="Turmas" subtitle="jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GroupCard group={item} />}
        ListEmptyComponent={() => <EmptyList message="Que tal adicionar a primeira turma?" />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />

      <Button buttonText="Criar Turma" />
    </Container>
  );
}
