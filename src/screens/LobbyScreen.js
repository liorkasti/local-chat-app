// @refresh reset
import React, { useEffect, useState, useRef, useCallback } from "react";
import { StyleSheet, View, TextInput, Image, KeyboardAvoidingView, Alert, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Input } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, useDispatch } from 'react-redux';
import io from "socket.io-client";
import Icon from 'react-native-vector-icons/FontAwesome';
// import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { GiftedChat } from "react-native-gifted-chat";

import Login from "../components/Login";
import Background from '../components/Background'
import { db, auth } from '../firebase'

// const currentUser = auth().currentUser;
const chatRef = db.collection('chats');

function LobbyScreen({ navigation }) {

  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [username, setUsername] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);
  const [user, setUser] = useState(null);
  const [avatarURL, setAvatarURL] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getData()
    const unsubscribe = chatRef.onSnapshot(querySnapshot => {
      const messagesFirestore =
        querySnapshot.docChanges().filter(({ type }) => type === 'added')
          .map(({ doc }) => {
            const message = doc.data()
            return { ...message, createdAt: message.createdAt.toDate() }
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, []);


  const appendMessages = useCallback((messages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [messages])

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      console.log('getData user: ', user)
      if (user) {
        setUser(JSON.parse(user))
      }
      if (!user) {
        return <View style={styles.container}></View>
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  async function storeData() {
    try {
      const avatar = `https://placeimg.com/${rand1}/${rand2}/any`
      setAvatarURL(avatarURL)
      const _id = Math.random().toString(36).substring(7)
      const user = {
        _id,
        username,
        // avatarURL
      }
      await AsyncStorage.setItem('user', JSON.stringify(user))
        .then(() => { console.log('AsyncStorage user: ', user) })
      setUser(user)
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  const handleSend = async (messages) => {
    const messagesStack = messages.map(m => chatRef.add(m))
    await Promise.all(messagesStack)
    console.log('appendMessages: ', messagesStack)
    console.log('handleSend user: ', user)
  }

  useEffect(() => {
    username.length > 3 && setActive(true);
  }, [username]);

  if (!user) {
    return (
      <Background style={styles.container}>
        <Image
          resizeMode="contain"
          style={{ flex: 1, marginTop: 100 }}
          source={require("../assets/tictuk-logo.png")}
        />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Input
            onChangeText={text => setUsername(text)}
            onSubmitEditing={() => { username.length > 3 ? setActive(true) : setActive(false) }}
            rightIcon={{ type: 'font-awesome', name: 'chevron-right', size: 20, color: '#888' }}
            value={username}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{ borderColor: "#888", borderBottomWidth: 1, fontSize: 22, textAlign: "center", marginVertical: 20 }}
            placeholder="Enter username"
            leftIcon={
              <Icon
                name='user'
                size={20}
                color='#888'
              />}
          />
          <View style={styles.button}>
            <TouchableOpacity
              // disabled={active}
              onPress={(username) => {
                active ?
                  storeData()
                  // storeData(username)
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
            {username.length > 3 ? null : <CustomAlert />}
            {/* <Login /> */}
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" />
      </Background>
    );
  }
  return (
    <GiftedChat
      renderUsernameOnMessage
      messages={messages}
      onSend={handleSend}
      showAvatarForEveryMessage={true}
      user={{
        user,
        avatar: avatarURL ? avatarURL : `https://placeimg.com/${rand1}/${rand2}/any`,
      }}
    />
    // {Platform.OS === "android" && (<KeyboardAvoidingView behavior="padding" />)}
  );
}

const mapStateToProps = state => ({ data: state.username })

export default connect(mapStateToProps)(LobbyScreen);

const CustomAlert = () => {
  return (
    <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.errorText} title={'Invalid User!'}>Username must be 4 characters long.</Text>
    </Animatable.View>
  );
};
  
const rand1 = Math.round(Math.random() * 200 + 100);
const rand2 = Math.round(Math.random() * 200 + 100);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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