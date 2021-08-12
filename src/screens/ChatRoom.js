import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView, StatusBar } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import LobbyScreen from "./LobbyScreen";
import Background from '../components/Background'

ChatRoom.navigationOptions = props => ({
  title: props.navigation.getParam("name")
});

export default function ChatRoom({ route, navigation }) {
  
  console.log("ChatRoom route: ", route)
  console.log("ChatRoom navigation: ", navigation)
  
  const dispatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser);
  const conversations = useSelector(state => state.conversations);
  const userId = route.params.userId;
  const messages = conversations[userId].messages;

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={messages => {
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          });
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: userId }
          });
        }}
        user={{
          _id: selfUser.userId
        }}
      />
      {Platform.OS === "android" && (<KeyboardAvoidingView behavior="padding" />)}
    </View>
  );
}
