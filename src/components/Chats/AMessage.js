// import { View, Text, StyleSheet, Image, Pressable } from "react-native";
// import { useEffect, useState } from "react";
// import { Auth, Storage } from "aws-amplify";
// // import { S3Image } from "aws-amplify-react-native/dist/Storage";
// import ImageView from "react-native-image-viewing";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(relativeTime);
const AMessage = ({ message }) => {
  //   const [isMe, setIsMe] = useState(false);
  //   const [imageSources, setImageSources] = useState([]);
  //   const [imageViewerVisible, setImageViewerVisible] = useState(false);

  //   useEffect(() => {
  //     const isMyMessage = async () => {
  //       const authUser = await Auth.currentAuthenticatedUser();
  //       setIsMe(message.userID === authUser.attributes.sub);
  //     };
  //     isMyMessage();
  //   }, []);

  //   useEffect(() => {
  //     const downloadImages = async () => {
  //       if (message.images?.length) {
  //         const key = message.images[0];
  //         const uri = await Storage.get(key);
  //         // TODO:
  //         setImageSources([{ uri }]);
  //       }
  //     };
  //     downloadImages();
  //   }, [message.images]);

  return (
    <View></View>
    //     <View
    //       style={[
    //         styles.container,
    //         {
    //           backgroundColor: isMe ? "#DCF8C5" : "white",
    //           alignSelf: isMe ? "flex-end" : "flex-start",
    //         },
    //       ]}
    //     >
    //       {/* attach image (if any) to text message */}
    //       {message.images?.length && (
    //         <>
    //           <Pressable onPress={() => setImageViewerVisible(true)}>
    //             <Image source={imageSources[0]} style={styles.image} />
    //           </Pressable>
    //           <ImageView
    //             images={imageSources}
    //             imageIndex={0}
    //             visible={imageViewerVisible}
    //             onRequestClose={() => setImageViewerVisible(false)}
    //           />
    //         </>
    //       )}
    //       <Text>{message.text}</Text>
    //       <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    //     </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     margin: 5,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: "80%",
//   },
//   time: { color: "gray", alignSelf: "flex-end" },

//   image: {
//     width: 200,
//     height: 100,
//     borderColor: "white",
//     borderWidth: 2,
//     borderRadius: 5,
//   },
// });

export default AMessage;
