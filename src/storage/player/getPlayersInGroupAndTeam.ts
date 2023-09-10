import { getPlayersInGroup } from "./getPlayersInGroup";

export async function getPlayersInGroupAndTeam(groupId: string, team: string) {
  try {
    const storage = await getPlayersInGroup(groupId);

    const players = storage.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
