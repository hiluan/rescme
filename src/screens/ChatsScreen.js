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
import { ArchivedChats } from "../components/Chats";

export default function ChatsScreen() {
  const { currentLocation } = useContext(LocationContext);
  const { showHistory, setShowHistory } = useContext(ShowHistoryContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (showHistory) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showHistory]);

  const handleTapOutsideArchivedChats = () => {
    setShowHistory(false);
  };

  const translateY = animation.interpolate({
    inputRange: [0, 3],
    outputRange: [0, -200], // Adjust the value to control the slide distance
  });

  return (
    <TouchableWithoutFeedback onPress={handleTapOutsideArchivedChats}>
      <View
        style={[styles.container, { backgroundColor: theme.background[1000] }]}
      >
        <Text style={styles.title}>Current Situation</Text>
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
        <Animated.View
          style={[styles.archivedChats, { transform: [{ translateY }] }]}
        >
          {showHistory && <ArchivedChats />}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    backgroundColor: "red",
    textAlign: "left",
    fontSize: 16,
    marginVertical: 15,
  },
  mapContainer: {
    width: "95%",
    height: "30%",
    top: 0,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  archivedChats: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
  },
});
