import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import RootStackScreen from './RootStackScreen';
import { ChatRoom, LobbyScreen } from '../screens';
import Background from '../components/Background'

const Stack = createStackNavigator();

export default AppStack = () => {

  const usersOnline = useSelector(state => state.usersOnline);
  console.log("usersOnline", usersOnline);

  // if (isLoading) {
  //   return (
  //     <Background>
  //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <ActivityIndicator size="large" />
  //       </View>
  //     </ Background>
  //   );
  // } 
  return (
    <NavigationContainer>
      {/* {loginState.userToken === null ? ( */}
      {username ?
        <Stack.Navigator /* headerMode='none' */>
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
        </Stack.Navigator>
        :
        <RootStackScreen />
      }
    </NavigationContainer>
  );
}