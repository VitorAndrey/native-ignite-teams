import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { getGroups } from "./getGroups";
import { AppError } from "../../utils/AppError";

import uuid from "react-native-uuid";

export async function createGroup(newGroupName: string) {
  try {
    const storedGroups = await getGroups();

    const newGroup = {
      id: String(uuid.v4()),
      name: newGroupName,
    };

    if (storedGroups.length !== 0) {
      const groupAlreadyExists = storedGroups.map((group) => {
        return group.name.includes(newGroup.name);
      });

      if (groupAlreadyExists[0]) {
        throw new AppError("Já existe um grupo cadastrado com esse nome.");
      }
    }

    const updatedList = JSON.stringify([...storedGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, updatedList);

    return newGroup;
  } catch (error) {
    throw error;
  }
}
