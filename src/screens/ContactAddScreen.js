import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

const ContactAddScreen = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [existingUser, setExistingUser] = useState(false);

  return (
    <View>
      <TextInput
        placeholder="Enter Phone Number"
        placeholderTextColor={"#fff"}
        value={name}
        onChangeText={(txt) => setName(txt)}
        style={{
          width: "90%",
          height: 50,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: "#fff",
          paddingLeft: 15,
          alignSelf: "center",
          marginTop: 50,
          color: "#fff",
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 50,
          width: "90%",
          marginTop: 50,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {}}
      >
        <Text style={{ color: "#000" }}>Search User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactAddScreen;
