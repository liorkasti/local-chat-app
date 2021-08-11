import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import LobbyScreen from "./LobbyScreen";

export default function HomeScreen() {
  const [conversations, setRecvMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.1.18:6868");
    socket.current.on("message", message => {
      setRecvMessages(prevState => GiftedChat.append(prevState, message));
    });
  }, []);

  const onSend = messages => {
    console.log('conversations: ', conversations)
    console.log('socket.current: ', socket.current)
    socket.current.emit("message", messages[0].text);
    setRecvMessages(prevState => GiftedChat.append(prevState, messages));
  };

  const joinChat = username => {
    socket.current.emit("join", username);
    setHasJoined(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {hasJoined ? (
        <GiftedChat
          renderUsernameOnMessage
          messages={conversations}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1
          }}
        />
      ) : (
        <LobbyScreen joinChat={joinChat} />
      )}
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
