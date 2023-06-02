import { Text, View, Image, StyleSheet, Pressable } from "react-native";
// import { Auth, API, graphqlOperation } from "aws-amplify";
// import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import { onUpdateChatRoom } from "../../graphql/subscriptions";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const AChat = ({ chat }) => {
  const navigation = useNavigation();

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
      onPress={
        () => console.log(chat)
        //   navigation.navigate(
        // "Situation"
        // , {
        //   id: chatRoom.id,
        //   name: user?.name,
        // }
        //   )
      }
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.situationTitleContainer}>
          <Text style={styles.situationTitle} numberOfLines={1}>
            {/* {chatRoom.name || user?.name} */}
            Situation Name
          </Text>
          <Text style={styles.situationDate}>
            {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {/* {chatRoom.name || user?.name} */}
            {chat.user.name}
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
        <Text style={styles.row} numberOfLines={1}>
          {chat.lastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },

  situationTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "brown",
  },
  situationTitle: {
    // flex: 1,
    fontWeight: "bold",
    // backgroundColor: "red",
  },
  situationDate: { color: "gray" },

  content: {
    flex: 1,
    // backgroundColor: "gold",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  row: { flexDirection: "row", marginBottom: 5, color: "gray" },
  name: {
    flex: 1,
    fontWeight: "bold",
    // backgroundColor: "red",
  },
});

export default AChat;
