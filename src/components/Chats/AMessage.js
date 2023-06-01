import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MeContext } from "../../context";
import { mapStyle } from "../../utils";
dayjs.extend(relativeTime);

const AMessage = ({
  message,
  theme,
  // isMe, setIsMe
}) => {
  const [isMe, setIsMe] = useState(false);
  // const { isMe, setIsMe } = useContext(MeContext);
  //TODO: FIX isMe context
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

  const stylesContainer = {
    backgroundColor: isMe ? theme.blueAccent[600] : theme.background[800],
    alignSelf: isMe ? "flex-end" : "flex-start",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  };

  const textColor = { color: theme.gray[0] };
  return (
    <View style={stylesContainer}>
      {hasLocation ? (
        <TouchableOpacity onPress={openLocation} activeOpacity={0.7}>
          <View style={styles.mapMsgContainer}>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                customMapStyle={mapStyle}
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
            </View>

            <Text style={[styles.coordinates, textColor]}>
              Latitude: {message.location.latitude.toFixed(6)}
            </Text>
            <Text style={[styles.coordinates, textColor]}>
              Longitude: {message.location.longitude.toFixed(6)}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.text, textColor]}>{message.text}</Text>
      )}
      <Text style={[styles.createdAt, { color: theme.gray[300] }]}>
        {dayjs(message.createdAt).fromNow(true)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mapMsgContainer: {
    alignItems: "center",
  },
  mapContainer: {
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  map: {
    width: 200,
    height: 180,
  },
  coordinates: {
    marginBottom: 5,
  },
  text: { fontSize: 16 },
  createdAt: {
    alignSelf: "flex-end",
  },
});

export default AMessage;
