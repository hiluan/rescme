import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const AMessage = ({ message }) => {
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    const isMyMessage = async () => {
      setIsMe(message.user.id === "u1");
    };
    isMyMessage();
  }, []);

  const hasLocation =
    message.location && Object.keys(message.location).length > 0;

  const openLocation = () => {
    const { latitude, longitude } = message.location;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? "#DCF8C5" : "white",
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
    >
      {hasLocation ? (
        <TouchableOpacity onPress={openLocation} activeOpacity={0.7}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              initialRegion={{
                latitude: message.location.latitude,
                longitude: message.location.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
            >
              <Marker coordinate={message.location} />
            </MapView>
            <Text style={styles.coordinates}>
              Latitude: {message.location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordinates}>
              Longitude: {message.location.longitude.toFixed(6)}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text>{message.text}</Text>
      )}
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  mapContainer: {
    alignItems: "center",
  },
  map: {
    width: 200,
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  coordinates: {
    marginBottom: 5,
  },
  time: {
    color: "gray",
    alignSelf: "flex-end",
  },
});

export default AMessage;
