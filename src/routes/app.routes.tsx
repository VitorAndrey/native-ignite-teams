import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useTheme } from "styled-components/native";

import { Groups } from "@screens/Groups";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";
import { View } from "react-native";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_600 }}>
      <Navigator initialRouteName="groups" screenOptions={{ headerShown: false }}>
        <Screen name="groups" component={Groups} />
        <Screen name="newgroup" component={NewGroup} />
        <Screen name="players" component={Players} />
      </Navigator>
    </View>
  );
}
