import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { Group } from "@screens/Groups";

export async function getGroups() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
    const groups: Group[] = storage ? JSON.parse(storage) : [];
    return groups;
  } catch (error) {
    throw error;
  }
}
