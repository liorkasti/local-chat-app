import React, { useState, useEffect, YellowBox, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import RootStackScreen from './RootStackScreen';
import { ChatRoom, LobbyScreen, SplashScreen } from '../screens';
import Background from '../components/Background'
import Orientation from 'react-native-orientation-locker';

// YellowBox.ignoreWarnings([
//   'Non-serializable values were found in the navigation state',
// ]);

const Stack = createStackNavigator();
const currentUser = auth().currentUser;

export default AppStack = () => {

  const [user, setUser] = useState();
  const usersOnline = useSelector(state => state.data);
  const [loaded, setLoaded] = useState(false);

  console.log("currentUser: ", currentUser);
  useEffect(() => {
    onAuthStateChanged = (user) => {
      wait(200).then(() => (
        currentUser ? setLoaded(true) : setLoaded(false)
      ));
    }
  }, [currentUser]);

  useEffect(() => {
    // bootstrap()
    setTimeout(() => { Orientation.lockToPortrait(); });
    return onOpenIndex();
  }, []);

  const onOpenIndex = () => { console.disableYellowBox = true; }

  const username = "";
  if (username) {
    return (
      <Background>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </ Background>
    );
  }
  return (
    <NavigationContainer>
      {/* {loginState.userToken === null ? ( */}
      {loaded ?
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
        :
        <RootStackScreen />
      }
    </NavigationContainer>
  );
}

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
async function bootstrap() {
  await database().settings({
    persistence: false, // disable offline persistence
  });
}