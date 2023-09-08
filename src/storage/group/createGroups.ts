import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { getGroups } from "./getGroups";

export async function createGroup(newGroupName: string) {
  try {
    const storedGroups = await getGroups();
    const updatedList = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, updatedList);
  } catch (error) {
    throw error;
  }
}
