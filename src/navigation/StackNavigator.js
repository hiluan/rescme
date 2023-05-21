import {
  ChatScreen,
  ContactAddScreen,
  ContactScreen,
  StatusScreen,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../context";
import { useContext } from "react";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.background[1000] },
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Status" component={StatusScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Contact Add" component={ContactAddScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
