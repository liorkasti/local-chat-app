import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView, StatusBar } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import LobbyScreen from "./LobbyScreen";
import Background from '../components/Background'
import { useDispatch } from "react-redux";
// import { Header } from "react-navigation-stack";

export default function ChatRoom({ navigation }) {
  const [conversations, setRecvMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.1.18:3001");
    socket.current.on("message", message => {
      setRecvMessages(prevState => GiftedChat.append(prevState, message));
      console.log('conversations: ', conversations)
    });
  }, []);

  const onSend = messages => {
    console.log('socket.current.io: ', socket.current)
    joinChat(messages)
    socket.current.emit("message", messages[0].text);
    setRecvMessages(prevState => GiftedChat.append(prevState, messages));
  };

  const joinChat = username => {
    // console.log('socket.current: ', socket.current)
    socket.current.emit("join", username);
    setHasJoined(true);
    console.log('username: ', username)
  };

  return (
    <GiftedChat
      renderUsernameOnMessage
      messages={conversations}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
  );
}
