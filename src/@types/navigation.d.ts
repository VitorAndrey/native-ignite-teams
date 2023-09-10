import { Group } from "@screens/Groups";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      newgroup: undefined;
      players: {
        group: Group;
      };
    }
  }
}
