import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import ChatScreen from "../screens/ChatScreen";
import StatusScreen from "../screens/StatusScreen";
import { ThemeContext } from "../context";
import { useContext } from "react";

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
        {/* <Stack.Screen name="Contacts" component={ContactsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
