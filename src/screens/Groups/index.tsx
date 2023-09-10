import React, { useState, useCallback } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { GroupCard } from "@components/GroupCard";
import { Alert, FlatList } from "react-native";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";
import { getGroups } from "../../storage/group/getGroups";
import { Loading } from "@components/Loading";

export type Group = {
  id: string;
  name: string;
  // size?: number;
  // integrants?: string[]
};

export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<Group[] | []>([]);

  const navigation = useNavigation();

  function handleGoToNewGroup() {
    navigation.navigate("newgroup");
  }

  function handleOpenGroup(group: Group) {
    navigation.navigate("players", { group });
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await getGroups();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível buscar as turmas.");
    } finally {
      setIsLoading(false);
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GroupCard group={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => <EmptyList message="Que tal adicionar a primeira turma?" />}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button buttonText="Criar nova turma" onPress={handleGoToNewGroup} />
    </Container>
  );
}
