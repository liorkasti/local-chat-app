import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Button, Platform, KeyboardAvoidingView, Alert, Text } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function LobbyScreen({ joinChat }) {
  const [username, setUsername] = useState("");
  const [isActive, setActive] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../assets/tictuk-logo.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          onChangeText={text => {
            setUsername(text)
            setActive(true)
          }}
          value={username}
          style={{ fontSize: 30, textAlign: "center" }}
          placeholder="Enter username"
        />
        {/* TODO: button disable and use CustomAlert:*/}
        {/* {username.length > 4 ? <></> : <CustomAlert />} */}
        <Button title="Join Chat" onPress={() => username ? joinChat(username) : Alert.alert('Invalid User!', 'Please enter your name.')} />
      </View>
      {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
const CustomAlert = () => {
  return (
    <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.errorMsg} title={'Invalid User!'}>Username must be 4 characters long.</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
});