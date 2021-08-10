import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer, /* createStackNavigator */ } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RootStackScreen from './RootStackScreen';
import { ChatRoom, LobbyScreen } from '../screens';

const Stack = createStackNavigator();

export default AppStack = () => {

  const [loginState, dispatch] = useState(false);

  if (loginState.isLoading) {
    return (
      <Background>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </ Background>
    );
  } return (
    <NavigationContainer>
      {/* {loginState.userToken === null ? ( */}
      {loginState.userToken !== null ? (
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name="ChatScreen" component={ChatRoom} />
          <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
        </Stack.Navigator>
      )
        :
        <RootStackScreen />
      }
    </NavigationContainer>
  );
}