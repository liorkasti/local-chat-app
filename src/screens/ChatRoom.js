import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView, StatusBar } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import LobbyScreen from "./LobbyScreen";
import Background from '../components/Background'

// ChatRoom.navigationOptions = props => ({
//   title: props.navigation.getParam("name")
// });

export default function ChatRoom({ route, navigation }) {

  console.log("route : ", route.params.username)
  console.log("navigation : ", navigation)
  const [recvMessages, setRecvMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.1.18:3001");
    socket.current.on("message", message => {
      setRecvMessages(prevState => GiftedChat.append(prevState, message));
    });
  }, []);

  const joinChat = username => {
    socket.current.emit("join", username);
    setHasJoined(true);
  };


  const onSend = messages => {
    socket.current.emit("message", messages[0].text);
    setRecvMessages(prevState => GiftedChat.append(prevState, messages));
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={recvMessages}
        onSend={messages => onSend(messages)}
        showAvatarForEveryMessage={true}
        user={{
          _id: route.params.username
        }}
      />
      <KeyboardAvoidingView behavior="padding" />
    </View>
  );
}
