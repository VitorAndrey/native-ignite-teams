import React, { useEffect, useState, useRef } from "react";

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
import { useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { addPlayerInGroup } from "../../storage/player/addPlayerInGroup";
import { getPlayersInGroupAndTeam } from "@storage/player/getPlayersInGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import uuid from "react-native-uuid";
import { Group } from "@screens/Groups";

type RouteParams = {
  group: Group;
};

export function Players() {
  const [newPlayerInput, setNewPlayerInput] = useState<string>("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerInputRef = useRef<TextInput>(null);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const teamsList = [
    { id: "1", name: "Time A" },
    { id: "2", name: "Time B" },
    { id: "3", name: "Time C" },
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
      const playersByTeam = await getPlayersInGroupAndTeam(group.id, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado.");
    }
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

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlayerCard name={item.name} onRemove={() => {}} />}
        ListEmptyComponent={() => <EmptyList message="Não há pessoas nesse time." />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button buttonText="Remover turma" type="SECONDARY" />
    </Container>
  );
}
