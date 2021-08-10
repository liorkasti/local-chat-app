import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import ChatRoom from './src/screens/ChatRoom';
AppRegistry.registerComponent(appName, () => ChatRoom);
