import {
  ChatScreen,
  ContactAddScreen,
  ContactEditScreen,
  ContactScreen,
  StatusScreen,
} from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../context";
import { useContext } from "react";
import TabNavigator from "./TabNavigator";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { theme } = useContext(ThemeContext);

  const ContactScreenOptions = ({ navigation }) => ({
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate("Edit Contact")}
      >
        <Text style={{ color: theme.gray[200] }}>Edit</Text>
      </TouchableOpacity>
    ),
    headerRightContainerStyle: { paddingRight: 10 },
  });
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
        <Stack.Screen
          name="Situation"
          component={ChatScreen}
          // options={{ headerShown: false }} // Hide header for "Situation" screen
        />
        <Stack.Screen name="Add Contact" component={ContactAddScreen} />
        <Stack.Screen name="Edit Contact" component={ContactEditScreen} />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={ContactScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
