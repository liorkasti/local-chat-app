import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, TextInput, Image, Button, KeyboardAvoidingView, Alert, Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import io from "socket.io-client";

import Background from '../components/Background'

export default function LobbyScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [username, setUsername] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.1.18:3001");
    socket.current.on("message", message => {
      setRecvMessages(prevState => GiftedChat.append(prevState, message));
    });
  }, [hasJoined]);

  const joinChat = username => {
    socket.current.emit("join", username);
    setHasJoined(true);
    dispatch({ type: "connection", data: { username: username } });
    dispatch({ type: "server/join", data: { username: username, userId: 2 } });
    navigation.navigate("ChatRoom", { data: username });
  };

  return (
    <Background style={styles.container}>
      <Image
        resizeMode="contain"
        style={{ flex: 1, marginTop: 100 }}
        source={require("../assets/tictuk-logo.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <TextInput
          onChangeText={text => setUsername(text)}
          onSubmitEditing={() => setActive(true)}
          value={username}
          style={{ fontSize: 30, textAlign: "center", marginVertical: 20 }}
          placeholder="Enter username"
        />
        <Button
          title="Join Chat"
          onPress={() => { (username) ? joinChat(username) : Alert.alert('Invalid User!', 'Please enter your name.'); }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" />
    </Background>
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
  container: {
    flex: 1,
    paddingTop: 200
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    marginTop: 10,
    fontSize: 13
  }
});