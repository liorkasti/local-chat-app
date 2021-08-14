# React-native-socket.io-Chat
Simple NodeJS server on socket.io + Redux + Redux-socket.io and react-native mobile application

![](https://cdn-images-1.medium.com/max/300/1*GkR93AAlILkmE_3QQf88Ug.png)

## 🚀 Quick start

1.  **Step 1.**
    Clone the project
    ```sh
    # clone the project to your local computer
    git clone https://github.com/liorkasti/local-chat-app.git
    ```
1.  **Step 2.**
    Check your IP address for backend connect
    ```sh
    # Type on Terminal to find the IP address, it looks like that: inet 192.168.0.100 netmask 0xffffff00 broadcast 192.168.0.255. Take the 192.168.0.100 part/
    ifconfig (for iOS)
    ipconfig
    ```
1.  **Step 3.**
    Change the IP address in the App.js file
    ```sh
    # in /App.js/ line 10, change the IP that you found above, and add to the link below, remember add :3001 at the end
    const socket = io("http://192.***.*.**:3001");
    ```
1.  **Step 4.**
    Install the server dependencies and Run backend
    ```sh
    $ npm server `or` $ yarn server
    ```
1.  **Step 5.**
    Install the application dependencies (in another terminal)
    ```sh
    $ npm install `or` $ yarn 
    ```
1.  **Step 6.**
    Run metro bundler
    ```sh
    npm start `or` yarn start
    ```
1.  **Step 7.**
    Build the apk and install on your emulator or plugin device frontend (in another terminal)
    ```sh
    For Android:
    $ npm android  `or` $ yarn android
    For iOS:
    $ npm ios  `or` $ yarn ios
    ```

### Dependencies list

This app requires [Node.js](https://nodejs.org/), [express.js](https://expressjs.com/en/guide/routing.html), [Redux](https://redux.js.org/), [socket.io](https://socket.io) install it before you run the application

```

## Official Docs
This Application is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.
* [NodeJS ](https://nodejs.org/)
* [Express](https://expressjs.com/en/guide/routing.html)
* [Redux](https://redux.js.org/)
* [Redux-socket.io](https://github.com/itaylor/redux-socket.io/)
* [React Native](https://facebook.github.io/react-native/)
* [Socket.io](https://socket.io)
* [React Navigation](https://reactnavigation.org/)
* [GiftedChat ](https://github.com/FaridSafi/react-native-gifted-chat)
_______________________________________________

## TODOs:

| Number | Description |
| ------ | ------ |
| 1 | Fix socket.id connection loop
| 2 | Test multi devices chatroom
| 3 | Add user subscriptions options via firebase
| 4 | Add store collection for chats in the firrstore
| 5 | Modify UI in LobbyScreen.js
| 6 | Fix UI in SplashScreen.js
| 7 | Cleanup unused code 
<!-- | 8 | 
| 9 |  -->

Enjoy! thank you.

