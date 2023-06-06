import { Text, View, Image, StyleSheet, Pressable } from "react-native";
// import { Auth, API, graphqlOperation } from "aws-amplify";
// import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import { onUpdateChatRoom } from "../../graphql/subscriptions";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MapView, { Callout, Marker } from "react-native-maps";
import { useContext } from "react";
import { LocationContext } from "../../context";

dayjs.extend(relativeTime);

const AChat = ({ chat, theme }) => {
  const navigation = useNavigation();
  const { currentLocation } = useContext(LocationContext);
  const currentSituation =
    (new Date() - dayjs(chat.lastMessage?.createdAt)) / (1000 * 60 * 60) <= 24;

  //   const [user, setUser] = useState(null);
  //   const [chatRoom, setChatRoom] = useState(chat);

  //   // check chatRoom.users.items and get the user that is not us (auth user)
  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const authUser = await Auth.currentAuthenticatedUser();
  //       const currentUser = chatRoom.users.items.find(
  //         (item) => item.user.id !== authUser.attributes.sub
  //       );
  //       setUser(currentUser?.user);
  //     };
  //     fetchUser();
  //   }, []);

  //   // fetch chat room
  //   useEffect(() => {
  //     const subscribtion = API.graphql(
  //       graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
  //     ).subscribe({
  //       next: ({ value }) => {
  //         setChatRoom((cr) => ({
  //           ...(cr || {}), // if cr === null then {}
  //           ...value.data.onUpdateChatRoom,
  //         }));
  //       },
  //       error: (err) => console.warn(err),
  //     });

  //     return () => subscribtion.unsubscribe();
  //   }, [chat.id]);

  return (
    <Pressable
      onPress={() =>
        // console.log(chat)
        navigation.navigate(
          "Situation"
          // , {
          //   id: chatRoom.id,
          //   name: user?.name,
          // }
        )
      }
      style={[
        styles.container,
        {
          height: currentSituation ? 120 : 60,
        },
      ]}
    >
      {currentSituation ? (
        <View
          style={[
            styles.currentContainer,
            { backgroundColor: theme.background[950] },
          ]}
        >
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
            >
              <Marker coordinate={currentLocation}></Marker>
            </MapView>
          </View>
          <View
            style={[
              styles.currentLastMsgContainer,
              {
                borderBottomColor: theme.gray[700],
              },
            ]}
          >
            <View style={styles.situationTitleContainer}>
              <Text
                style={[
                  styles.situationTitle,
                  { color: theme.gray[200], fontSize: 16 },
                ]}
                numberOfLines={1}
              >
                {/* {chatRoom.name || user?.name} */}
                Current Situation:
              </Text>
              <Text style={[styles.situationDate, { color: theme.gray[650] }]}>
                {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
              </Text>
            </View>
            <Text
              style={[
                styles.situationTitle,
                { color: theme.gray[200], fontSize: 16 },
              ]}
              numberOfLines={1}
            >
              {/* {chatRoom.name || user?.name} */}
              User's Name
            </Text>
            <View style={styles.pastLastMessageContainer}>
              <Text
                style={[styles.name, { color: theme.gray[400] }]}
                numberOfLines={2}
              >
                {/* {chatRoom.name || user?.name} */}
                {chat.user.name}
                {": "}
                <Text
                  style={[styles.lastMessage, { color: theme.gray[500] }]}
                  numberOfLines={1}
                >
                  {chat.lastMessage?.text}
                </Text>
              </Text>
              {/* {chatRoom.LastMessage && (
            <Text style={styles.situationDate}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )} */}
              {/* <Text style={styles.situationDate}>
            {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
          </Text> */}
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.pastContainer,
            {
              borderBottomColor: theme.gray[700],
            },
          ]}
        >
          <View style={styles.situationTitleContainer}>
            <Text
              style={[styles.situationTitle, { color: theme.gray[200] }]}
              numberOfLines={1}
            >
              {/* {chatRoom.name || user?.name} */}
              Situation Name
            </Text>
            <Text style={[styles.situationDate, { color: theme.gray[650] }]}>
              {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
            </Text>
          </View>
          <View style={styles.pastLastMessageContainer}>
            <Text
              style={[styles.name, { color: theme.gray[400] }]}
              numberOfLines={1}
            >
              {/* {chatRoom.name || user?.name} */}
              {chat.user.name}
              {": "}
              <Text
                style={[styles.lastMessage, { color: theme.gray[500] }]}
                numberOfLines={1}
              >
                {chat.lastMessage?.text}
              </Text>
            </Text>
            {/* {chatRoom.LastMessage && (
            <Text style={styles.situationDate}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )} */}
            {/* <Text style={styles.situationDate}>
            {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
          </Text> */}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default AChat;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "gray",
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  currentContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    // marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  mapContainer: {
    width: 120,
    height: 120,
    // marginBottom: -20,
    // borderRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: 150, // hide google/apple logo at the bottom
  },
  currentLastMsgContainer: {
    height: "100%",
    flex: 1,
    // width: "100%",
    marginLeft: 20,
    marginRight: 10,
    paddingTop: 15,
    // backgroundColor: "gold",
  },
  situationTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  situationTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  situationDate: {},
  pastContainer: {
    flex: 1,
    // backgroundColor: "gold",
    justifyContent: "center",
    marginHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pastLastMessageContainer: {
    flexDirection: "row",
  },
  name: {
    flex: 1,
    fontSize: 15,
  },
  lastMessage: {
    fontSize: 15,
  },
});
