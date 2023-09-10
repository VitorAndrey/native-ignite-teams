import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLETCTION } from "../storageConfig";

export async function getPlayersInGroup(groupId: string) {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLETCTION}-${groupId}`);
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
  } catch (error) {
    throw error;
  }
}
