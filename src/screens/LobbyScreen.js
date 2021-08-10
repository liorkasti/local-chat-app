import React, { useState } from "react";
import { View, TextInput, Image, Button, Platform, KeyboardAvoidingView } from "react-native";

export default function LobbyScreen({ joinChat }) {
  const [username, setUsername] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../assets/tictuk-logo.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          style={{ fontSize: 30, textAlign: "center" }}
          placeholder="Enter username"
        />
        <Button title="Join Chat" onPress={() => joinChat(username)} />
      </View>
      {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
