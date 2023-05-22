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
          headerStyle: {
            backgroundColor: theme.background[950],
            shadowOpacity: 0,
            elevation: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.gray[200],
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Status" component={StatusScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Add Contact" component={ContactAddScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
