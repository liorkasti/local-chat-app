import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView, StatusBar } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import LobbyScreen from "./LobbyScreen";
import Background from '../components/Background'

export default function ChatRoom({ route, navigation }) {
  // console.log("route : ", route.params.username)
  console.log("navigation : ", navigation)
  const dispatch = useDispatch();
  const [recvMessages, setRecvMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  // useEffect(() => {
  //   if(route.params.username){
  //     socket.current = io("http://192.168.1.18:3001");
  //     socket.current.on("message", message => {
  //       setRecvMessages(prevState => GiftedChat.append(prevState, message));
  //     });
  //   }
  // }, []);

  const onSend = messages => {
    socket.current = io("http://192.168.1.18:3001");
    socket.current.on("message", message => {
      setRecvMessages(prevState => GiftedChat.append(prevState, message));
    });
    socket.current.emit("message", messages[0].text);
    setRecvMessages(prevState => GiftedChat.append(prevState, messages));
    // dispatch({ type: "server/hello", data: { message: messages[0], conversationId: userId } });
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={recvMessages}
        onSend={messages => onSend(messages)}
        showAvatarForEveryMessage={true}
        user={{
          _id: route.params.username,
          name: route.params.username,
          avatar: "https://placeimg.com/140/140/any`",
        }}
      />
      {/* {Platform.OS === "android" && (<KeyboardAvoidingView behavior="padding" />)} */}
    </View>
  );
}
