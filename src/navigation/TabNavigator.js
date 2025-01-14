import { AlertContext, ShowHistoryContext, ThemeContext } from "../context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import ContactsScreen from "../screens/ContactsScreen";
import SettingScreen from "../screens/SettingScreen";
import StatusScreen from "../screens/StatusScreen";
import ChatsScreen from "../screens/ChatsScreen";
import { View } from "react-native";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  const { isAlerted } = useContext(AlertContext);
  const { showHistory, setShowHistory } = useContext(ShowHistoryContext);

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

  const getHeaderBackgroundColor = (routeName) => {
    if (isAlerted && routeName === "Status") {
      return theme.redAccent[500];
    } else {
      return theme.background[1000];
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Status"
      screenOptions={({ route }) => ({
        headerShown: route.name !== "Status", // Hide header for "Status" route
        headerStyle: {
          backgroundColor: getHeaderBackgroundColor(route.name),
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: theme.gray[200],
        tabBarStyle: {
          backgroundColor: theme.background[1000],
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
      })}
    >
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{ tabBarIcon: icon("alert-circle") }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatsScreen}
        options={({ navigation }) => ({
          tabBarIcon: icon("chatbubbles"),
          // headerRight: () => (
          //   <MaterialCommunityIcons
          //     onPress={
          //       () => setShowHistory(!showHistory)
          //       // navigation.navigate("Archived Situations")
          //     }
          //     name={showHistory ? "archive-clock" : "archive-clock-outline"}
          //     size={24}
          //     color={theme.gray[500]}
          //     style={{
          //       marginRight: 15,
          //     }}
          //   />
          // ),
        })}
        // options={{
        //   tabBarIcon: icon("chatbubbles"),
        // }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={({ navigation }) => ({
          tabBarIcon: icon("people"),
          // headerRight: () => (
          //   <Ionicons
          //     onPress={() => navigation.navigate("Contact")}
          //     name="add"
          //     size={32}
          //     color={theme.redAccent[500]}
          //     style={{
          //       marginRight: 20,
          //     }}
          //   />
          // ),
        })}
        // options={{ tabBarIcon: icon("people") }}
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
