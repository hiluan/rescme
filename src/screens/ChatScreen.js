import {
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// // import { getChatRoom, listMessagesByChatRoom } from "../graphql/queries";
// // import { onCreateMessage, onUpdateChatRoom } from "../graphql/subscriptions";
// // import { API, graphqlOperation, Auth } from "aws-amplify";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { useEffect, useState } from "react";
// import { Feather } from "@expo/vector-icons";
// import InputBox from "../components/InputBox";
// import Message from "../components/Message";
// import bg from "../../assets/images/BG.png";
import messages from "../../assets/data/messages.json";
import { WINDOW_HEIGHT } from "../utils";
import { useCallback, useContext, useRef } from "react";
import { AMessage, InputBox } from "../components/Chats";
import { MeContext, ThemeContext } from "../context";
const ChatScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { isMe, setIsMe } = useContext(MeContext);
  const ref = useRef(null);

  // const [chatRoom, setChatRoom] = useState(null);
  // const [messages, setMessages] = useState([]);

  // const route = useRoute();
  // const navigation = useNavigation();
  // const chatroomID = route.params.id;

  // // fetch chat room
  // useEffect(() => {
  //   API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
  //     (result) => setChatRoom(result.data?.getChatRoom)
  //   );

  //   const subscribtion = API.graphql(
  //     graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chatroomID } } })
  //   ).subscribe({
  //     next: ({ value }) => {
  //       setChatRoom((cr) => ({
  //         ...(cr || {}), // if cr === null then {}
  //         ...value.data.onUpdateChatRoom,
  //       }));
  //     },
  //     error: (err) => console.warn(err),
  //   });

  //   return () => subscribtion.unsubscribe();
  // }, [chatroomID]);

  // // fetch chat room's messages
  // useEffect(() => {
  //   API.graphql(
  //     graphqlOperation(listMessagesByChatRoom, {
  //       chatroomID,
  //       sortDirection: "DESC",
  //     })
  //   ).then((result) => setMessages(result.data?.listMessagesByChatRoom?.items));

  //   // subscribe to new messages
  //   const subscribtion = API.graphql(
  //     graphqlOperation(onCreateMessage, {
  //       filter: { chatroomID: { eq: chatroomID } }, // only subscribe to/update in the current chatroom
  //     })
  //   ).subscribe({
  //     next: ({ value }) =>
  //       setMessages((m) => [value.data.onCreateMessage, ...m]),
  //     error: (err) => console.warn(err),
  //   });

  //   return () => subscribtion.unsubscribe(); // when component's unmounted: when we leave the screen, stop listening to new messages
  // }, [chatroomID]);

  // // whenever user's name changes => set title to user's name
  // useEffect(() => {
  //   navigation.setOptions({
  //     title: chatRoom?.name || route.params.name,
  //     headerRight: () => (
  //       <Feather
  //         onPress={() => navigation.navigate("Group Info", { id: chatroomID })}
  //         name="more-vertical"
  //         size={24}
  //         color="gray"
  //       />
  //     ),
  //   });
  // }, [route.params.name, chatroomID]);

  // if (!chatRoom) {
  //   return <ActivityIndicator />;
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={[styles.container, { backgroundColor: theme.background[950] }]}
    >
      {/* //TODO: create button to update current location */}
      {/* {isMe && (
        <TouchableOpacity
          onPress={openLocation}
          activeOpacity={0.7}
        ></TouchableOpacity>
      )} */}

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <AMessage
            message={item}
            theme={theme}
            isMe={isMe}
            setIsMe={setIsMe}
          />
        )}
        style={styles.list}
        inverted
      />
      <InputBox
        theme={theme}
        isMe={isMe}
        // chatroomID={chatroomID} chatRoom={chatRoom}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // container: {},
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
