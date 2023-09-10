import React, { useEffect, useState, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";

import { Group } from "@screens/Groups";

import { addPlayerInGroup } from "@storage/player/addPlayerInGroup";
import { getPlayersInGroupAndTeam } from "@storage/player/getPlayersInGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { removePlayerInGroup } from "@storage/player/removePlayerInGroup";
import { removeGroup } from "@storage/group/removeGroup";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: Group;
};

export function Players() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newPlayerInput, setNewPlayerInput] = useState<string>("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigate = useNavigation();

  const newPlayerInputRef = useRef<TextInput>(null);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const teamsList = [
    { id: "1", name: "Time A" },
    { id: "2", name: "Time B" },
  ];

  async function handleAddPlayer() {
    if (newPlayerInput.trim().length === 0) {
      return Alert.alert("Nova Pessoa", "Informe o nome da pessoa antes de adicionar.");
    }

    const newPlayer = {
      name: newPlayerInput,
      team,
      id: String(uuid.v4()),
    };

    try {
      await addPlayerInGroup(newPlayer, group.id);
      fetchPlayersByTeam();
      newPlayerInputRef.current?.blur();
      setNewPlayerInput("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert("Nova pessoa", "Não foi possível adicionar esta pessoa");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await getPlayersInGroupAndTeam(group.id, team);
      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado.");
    }
  }

  async function handleRemovePlayer(playerId: string) {
    try {
      await removePlayerInGroup(playerId, group.id);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover a pessoa selecionada.");
    }
  }

  async function onRemoveGroup() {
    try {
      await removeGroup(group.id);
      navigate.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Grupo", "Não foi possível remover este grupo");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover", "Deseja remover este groupo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onRemoveGroup() },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <HighLigth title={group.name} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerInput}
          onChangeText={setNewPlayerInput}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={teamsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Filter
              title={item.name}
              isActive={team === item.name}
              onPress={() => setTeam(item.name)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handleRemovePlayer(item.id);
              }}
            />
          )}
          ListEmptyComponent={() => <EmptyList message="Não há pessoas nesse time." />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
        />
      )}

      <Button buttonText="Remover turma" type="SECONDARY" onPress={handleRemoveGroup} />
    </Container>
  );
}
