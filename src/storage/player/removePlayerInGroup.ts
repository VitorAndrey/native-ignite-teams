import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLETCTION } from "@storage/storageConfig";

import { getPlayersInGroup } from "./getPlayersInGroup";

export async function removePlayerInGroup(playerId: string, groupId: string) {
  try {
    const storage = await getPlayersInGroup(groupId);

    const filteredPlayers = storage.filter((player) => player.id !== playerId);
    const players = JSON.stringify(filteredPlayers);

    await AsyncStorage.setItem(`${PLAYER_COLLETCTION}-${groupId}`, players);
  } catch (error) {
    throw error;
  }
}
