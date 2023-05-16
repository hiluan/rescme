import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { ThemeContext } from "../context";
import { useContext } from "react";
import ContactsScreen from "../screens/ContactsScreen";
import SettingScreen from "../screens/SettingScreen";
import StatusScreen from "../screens/StatusScreen";
import ChatsScreen from "../screens/ChatsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  const tabBarActiveTintColor = theme.gray[0];
  const tabBarInactiveTintColor = theme.gray[600];

  // Helper function to create tabBarIcon
  const icon = (iconName) => {
    return ({ color, size, focused }) => (
      <Ionicons
        name={focused ? iconName : iconName + "-outline"}
        color={focused ? tabBarActiveTintColor : tabBarInactiveTintColor}
        size={size}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Status"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background[1000],
          borderTopWidth: 0, // Remove the top border line
          elevation: 0, // Remove the header shadow
        },
        headerStyle: {
          backgroundColor: theme.background[950],
          // elevation: 0, // Remove the header shadow
        },
        headerTintColor: theme.gray[200],
        // headerTintColor: theme.gray[950], // use this to 'hide' header but keep safearea
        // headerShown: false, // Hide the header
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
      }}
    >
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{ tabBarIcon: icon("alert-circle") }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: icon("chatbubbles"),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ tabBarIcon: icon("people") }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ tabBarIcon: icon("settings") }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
