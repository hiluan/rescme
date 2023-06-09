import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import ChatsScreen from "../screens/ChatsScreen";
import SettingScreen from "../screens/SettingScreen";
import StatusScreen from "../screens/StatusScreen";
import ContactsScreen from "../screens/ContactsScreen";

const Tab = createBottomTabNavigator();

// Helper function to create tabBarIcon
const icon = (iconName) => {
  return ({ color, size }) => (
    <Ionicons name={iconName} color={color} size={size} />
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Status"
      screenOptions={{
        tabBarStyle: { backgroundColor: "whitesmoke" },
        headerStyle: { backgroundColor: "whitesmoke" },
      }}
      //   tabBarOptions={{
      //     activeTintColor: "green", // Setting active color to red
      //   }}
    >
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{ tabBarIcon: icon("logo-whatsapp") }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={({ navigation }) => ({
          tabBarIcon: icon("ios-chatbubbles-sharp"),
          headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate("Contacts")}
              name="new-message"
              size={18}
              color="royalblue"
              style={{
                marginRight: 10,
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ tabBarIcon: icon("settings-outline") }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ tabBarIcon: icon("settings-outline") }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
