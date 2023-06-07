import { View, TextInput, StyleSheet, Image, Platform } from "react-native";
// import { createMessage, updateChatRoom } from "../../graphql/mutations";
// import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
//
// import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";

const InputBox = ({
  theme,
  isMe,
  //  chatroomID, chatRoom
}) => {
  const [newText, setNewText] = useState("");
  const [imageURI, setImageURI] = useState(null);

  const onSend = async () => {
    // const authUser = await Auth.currentAuthenticatedUser();
    // const newMessage = {
    //   chatroomID,
    //   text: newText,
    //   userID: authUser.attributes.sub,
    // };
    // // attach image to message:
    // if (imageURI) {
    //   newMessage.images = [await uploadFile(imageURI)];
    //   setImageURI(null);
    // }
    // const newMessageData = await API.graphql(
    //   graphqlOperation(createMessage, {
    //     input: newMessage,
    //   })
    // );
    // setNewText("");
    // // set the new message as LastMessage of the ChatRoom
    // await API.graphql(
    //   graphqlOperation(updateChatRoom, {
    //     input: {
    //       _version: chatRoom._version,
    //       chatRoomLastMessageId: newMessageData.data.createMessage.id,
    //       id: chatroomID,
    //     },
    //   })
    // );
  };

  const pickImage = async () => {
    // // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   quality: 1,
    // });
    // // console.log(result.assets[0].uri);
    // if (!result.canceled) {
    //   setImageURI(result.assets[0].uri);
    // }
  };

  const uploadFile = async (fileUri) => {
    // try {
    //   const response = await fetch(fileUri);
    //   const blob = await response.blob();
    //   const key = `${uuidv4()}.png`;
    //   await Storage.put(key, blob, {
    //     contentType: "image/png", // contentType is optional
    //   });
    //   return key;
    // } catch (err) {
    //   console.log("Error uploading file:", err);
    // }
  };

  return (
    <>
      {/* {imageURI && (
        <View style={styles.attachmentsContainer}>
          <Image
            source={{ uri: imageURI }}
            style={styles.selectedImage}
            resizeMode="contain"
          />

          <MaterialIcons
            name="highlight-remove"
            onPress={() => setImageURI(null)}
            size={20}
            color="gray"
            style={styles.removeSelectedImage}
          />
        </View>
      )} */}

      <SafeAreaView
        edges={["bottom"]}
        style={[styles.container, { backgroundColor: theme.background[950] }]}
      >
        {/* icons.expo.fyi */}
        {/* // TODO: only isMe can send the current location */}
        {/* {isMe && ( */}
        <MaterialIcons
          onPress={pickImage}
          name="person-pin"
          size={32}
          color={theme.blueAccent[500]}
          style={styles.inputIcon}
        />
        {/* )} */}
        <TextInput
          value={newText}
          onChangeText={setNewText}
          placeholder="..."
          placeholderTextColor={theme.gray[500]}
          textAlignVertical="center"
          multiline
          maxHeight={120}
          style={[
            styles.input,
            { backgroundColor: theme.background[800], color: theme.gray[0] },
            ,
            {
              ...Platform.select({
                ios: {
                  paddingTop: 10,
                  paddingBottom: 10,
                },
                android: {
                  paddingVertical: 5,
                },
              }),
            },
          ]}
        />

        <Ionicons
          onPress={onSend}
          name="send"
          size={28}
          style={styles.inputIcon}
          color={theme.blueAccent[500]}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontSize: 16,
  },
  inputIcon: {
    // padding: 7,
    // borderRadius: 15,
    overflow: "hidden",
    marginBottom: 3,
  },

  attachmentsContainer: {
    alignItems: "flex-end",
  },
  selectedImage: {
    height: 100,
    width: 200,
    margin: 5,
  },
  removeSelectedImage: {
    position: "absolute",
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});
export default InputBox;
