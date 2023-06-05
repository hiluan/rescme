// import { View, TextInput, StyleSheet, Image } from "react-native";
// import { createMessage, updateChatRoom } from "../../graphql/mutations";
// import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
// import { AntDesign, MaterialIcons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// //
// import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";

// const InputBox = ({ chatroomID, chatRoom }) => {
//   const [newText, setNewText] = useState("");
//   const [imageURI, setImageURI] = useState(null);

//   const onSend = async () => {
//     const authUser = await Auth.currentAuthenticatedUser();
//     const newMessage = {
//       chatroomID,
//       text: newText,
//       userID: authUser.attributes.sub,
//     };

//     // attach image to message:
//     if (imageURI) {
//       newMessage.images = [await uploadFile(imageURI)];
//       setImageURI(null);
//     }

//     const newMessageData = await API.graphql(
//       graphqlOperation(createMessage, {
//         input: newMessage,
//       })
//     );

//     setNewText("");
//     // set the new message as LastMessage of the ChatRoom

//     await API.graphql(
//       graphqlOperation(updateChatRoom, {
//         input: {
//           _version: chatRoom._version,
//           chatRoomLastMessageId: newMessageData.data.createMessage.id,
//           id: chatroomID,
//         },
//       })
//     );
//   };

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     // console.log(result.assets[0].uri);

//     if (!result.canceled) {
//       setImageURI(result.assets[0].uri);
//     }
//   };

//   const uploadFile = async (fileUri) => {
//     try {
//       const response = await fetch(fileUri);
//       const blob = await response.blob();
//       const key = `${uuidv4()}.png`;
//       await Storage.put(key, blob, {
//         contentType: "image/png", // contentType is optional
//       });
//       return key;
//     } catch (err) {
//       console.log("Error uploading file:", err);
//     }
//   };

//   return (
//     <>
//       {imageURI && (
//         <View style={styles.attachmentsContainer}>
//           <Image
//             source={{ uri: imageURI }}
//             style={styles.selectedImage}
//             resizeMode="contain"
//           />

//           <MaterialIcons
//             name="highlight-remove"
//             onPress={() => setImageURI(null)}
//             size={20}
//             color="gray"
//             style={styles.removeSelectedImage}
//           />
//         </View>
//       )}

//       <SafeAreaView edges={["bottom"]} style={styles.container}>
//         {/* icons.expo.fyi */}
//         <AntDesign
//           onPress={pickImage}
//           name="plus"
//           size={24}
//           color="royalblue"
//         />
//         <TextInput
//           value={newText}
//           onChangeText={setNewText}
//           placeholder="type your message..."
//           style={styles.input}
//         />
//         <MaterialIcons
//           onPress={onSend}
//           name="send"
//           size={20}
//           color="white"
//           style={styles.send}
//         />
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     backgroundColor: "whitesmoke",
//     padding: 10,
//     alignItems: "center",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 5,
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//     borderRadius: 50,
//     borderColor: "lightgray",
//     borderWidth: StyleSheet.hairlineWidth,
//   },
//   send: {
//     backgroundColor: "royalblue",
//     padding: 7,
//     borderRadius: 15,
//     overflow: "hidden",
//   },

//   attachmentsContainer: {
//     alignItems: "flex-end",
//   },
//   selectedImage: {
//     height: 100,
//     width: 200,
//     margin: 5,
//   },
//   removeSelectedImage: {
//     position: "absolute",
//     right: 10,
//     backgroundColor: "white",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
// });
// export default InputBox;
