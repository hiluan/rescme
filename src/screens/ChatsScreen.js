import React, { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { LocationContext, ShowHistoryContext, ThemeContext } from "../context";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Chats } from "../components/Chats";

export default function ChatsScreen() {
  const { currentLocation } = useContext(LocationContext);
  const { showHistory, setShowHistory } = useContext(ShowHistoryContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));

  const stylesTitle = {
    color: theme.gray[100],
    marginVertical: 15,
    marginLeft: 30,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background[1000] }]}
    >
      {/* <View style={styles.messagesContainer}> */}
      {/* <Text style={stylesTitle}>Current Situation</Text>
      <Pressable
        onPress={() => navigation.navigate("Situation")}
        style={styles.mapContainer}
      >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          <Marker coordinate={currentLocation} draggable={true}>
            <Callout>
              <Text>USER's location.</Text>
            </Callout>
          </Marker>
        </MapView>
      </Pressable>
      <View style={styles.separater}></View> */}

      {/* // TODO: when there's backend db, set > 24 hours => PAST SITUATIONs */}
      {/* <Text style={stylesTitle}>Past Situations</Text> */}
      <Chats theme={theme} />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  // messagesContainer: {
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  //   top: 0,
  //   borderBottomRightRadius: 20,
  //   borderBottomLeftRadius: 20,
  //   overflow: "hidden",
  // },

  mapContainer: {
    marginHorizontal: 10,
    height: "20%",
    borderRadius: 20,
    overflow: "hidden",
    // alignItems: "center",
    // alignSelf: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  separater: {
    height: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "white",
  },
});
