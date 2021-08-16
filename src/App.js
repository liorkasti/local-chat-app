import 'react-native-gesture-handler';
import React from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";

import AppContainer from "./navigation";

const socket = io("http://192.168.1.18:3001"); // replace with the IP of your server, when testing on real devices
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const initialState = {
  // user: {_id=`${Math.random().toString(36).substring(7)}`, username="", avatar:""}
}
function reducer(state = {initialState}, action) {
  switch (action.type) {
    case "MESSEGE":
      return { ...state, message: action.data };
    case "users_online":
      return { ...state, usersOnline: action.data };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state: ", store.getState());
});
// store.dispatch({ type: "server/hello", data: "Hello!" });

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}