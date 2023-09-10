import React, { useState, useCallback } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { GroupCard } from "@components/GroupCard";
import { FlatList } from "react-native";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";
import { getGroups } from "../../storage/group/getGroups";

export type Group = {
  id: string;
  name: string;
  // size?: number;
  // integrants?: string[]
};

export function Groups() {
  const [groups, setGroups] = useState<Group[] | []>([]);

  const navigation = useNavigation();

  function handleGoToNewGroup() {
    navigation.navigate("newgroup");
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <HighLigth title="Turmas" subtitle="jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupCard group={item} onPress={() => handleOpenGroup(item.name)} />
        )}
        ListEmptyComponent={() => <EmptyList message="Que tal adicionar a primeira turma?" />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        showsVerticalScrollIndicator={false}
      />

      <Button buttonText="Criar Turma" onPress={handleGoToNewGroup} />
    </Container>
  );
}
