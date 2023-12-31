import AsyncStorageHook from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLETCTION } from "../storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { getPlayersInGroup } from "./getPlayersInGroup";

export async function addPlayerInGroup(newPlayer: PlayerStorageDTO, groupId: string) {
  try {
    const storedPlayers = await getPlayersInGroup(groupId);

    const playerAlreadyExists = storedPlayers.filter((player) => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
      throw new AppError("Essa pessoa já está adicionada em um time.");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorageHook.setItem(`${PLAYER_COLLETCTION}-${groupId}`, storage);
  } catch (error) {
    throw error;
  }
}
