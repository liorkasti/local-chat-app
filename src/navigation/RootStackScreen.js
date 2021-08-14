import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ChatRoom, LobbyScreen, SplashScreen} from '../screens';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="LobbyScreen" component={LobbyScreen}/>
        <RootStack.Screen name="ChatRoom" component={ChatRoom}/>
    </RootStack.Navigator>
);

export default RootStackScreen;