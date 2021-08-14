import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, TextInput, Image, Button, KeyboardAvoidingView, Alert, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import io from "socket.io-client";

import Background from '../components/Background'

export default function LobbyScreen({ navigation }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [username, setUsername] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    username.length > 4 && setActive(true);
  }, [username]);

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
          // onSubmitEditing={() => { username.length > 4 ? setActive(true) : setActive(false) }}
          value={username}
          style={{ fontSize: 30, textAlign: "center", marginVertical: 20 }}
          placeholder="Enter username"
        />
        <View style={styles.button}>
          <TouchableOpacity disabled={active}
            onPress={() => {
              active ? joinChat(username)
                : Alert.alert('Invalid User!', 'Please enter your name.')
            }}
          >
            <LinearGradient
              colors={active ? ['#08d4c4', '#01ab9d'] : ['#ccc', '#bbb']}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Join Chat</Text>
              <MaterialIcons
                name="navigate-next"
                color="#fff"
                size={20}
              />
            </LinearGradient>
          </TouchableOpacity>
          <CustomAlert />
        </View>
      </View>
      <KeyboardAvoidingView behavior="padding" />
    </Background>
  );
}
const CustomAlert = () => {
  return (
    <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.errorText} title={'Invalid User!'}>Username must be 4 characters long.</Text>
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
    margin: 10,
    fontSize: 13
  },
  button: {
    alignItems: 'center',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});