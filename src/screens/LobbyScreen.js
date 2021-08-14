import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, Button, KeyboardAvoidingView, Alert, Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';

import Background from '../components/Background'

export default function LobbyScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [username, setUsername] = useState("");

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
        {/* TODO: button disable and use CustomAlert:*/}
        {/* {username.length > 4 ? <></> : <CustomAlert />} */}
        {/* Alert.alert('Invalid User!', 'Please enter your name.'); */}
        <Button title="Join Chat" onPress={() => {
          dispatch({ type: "server/join", data: username });
          navigation.navigate("ChatRoom", { username: username })
        }
        } />
        <KeyboardAvoidingView behavior="padding" />

        {/* <Button
          // onPress={() => username ? joinChat(username)
          title="Join Chat"
          onPress={() => {
            dispatch({ type: "server/join", data: username });
            navigation.navigate("ChatRoom");
          }}
        /> */}
      </View>
      {/* <KeyboardAvoidingView behavior="padding" /> */}
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
    fontSize: 13
  }
});