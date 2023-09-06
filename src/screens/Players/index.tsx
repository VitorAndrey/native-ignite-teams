import React, { useState } from "react";

import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Header } from "@components/Header";
import { HighLigth } from "@components/HighLigth";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState(["Vitor", "Heitor"]);

  const teamsList = [
    { id: "1", name: "Time A" },
    { id: "2", name: "Time B" },
    { id: "3", name: "Time C" },
  ];

  return (
    <Container>
      <Header showBackButton />
      <HighLigth title="Nome da turma" subtitle="adicione a galera e separe os times" />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <PlayerCard name={item} />}
      />
    </Container>
  );
}
