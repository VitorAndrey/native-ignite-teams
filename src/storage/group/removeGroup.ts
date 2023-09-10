import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLETCTION } from "../storageConfig";

import { getGroups } from "./getGroups";

export async function removeGroup(deletedGroupId: string) {
  try {
    const storedGroups = await getGroups();
    const filteredGroups = storedGroups.filter((group) => group.id !== deletedGroupId);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filteredGroups));
    await AsyncStorage.removeItem(`${PLAYER_COLLETCTION}-${deletedGroupId}`);
  } catch (error) {
    throw error;
  }
}
