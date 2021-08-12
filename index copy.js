import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";

import App from './src/App';
import ChatRoom from './src/screens/ChatRoom';
// import configureStore from './src/redux/store';

// const store = configureStore();
const socket = io("http://192.168.116.2:3001"); // replace with the IP of your server, when testing on real devices
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
    switch (action.type) {
      case "message":
        return { ...state, message: action.data };
      case "users_online":
        return { ...state, usersOnline: action.data };
      default:
        return state;
    }
  }

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
    console.log("new state", store.getState());
});
store.dispatch({ type: "server/hello", data: "Hello!" });


const ChatApp = () =>
    <Provider store={store}>
        <App />
    </Provider>

AppRegistry.registerComponent(appName, () => App);