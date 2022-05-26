import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from './src/screens/Welcome';
import { SignUp } from './src/screens/SignUp'
import { Login } from './src/screens/Login'
import { Home } from './src/screens/Home';
import { Chat } from './src/screens/Chat';
import { auth } from './src/firebase/config';
import { RootStackParamList } from './types';
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator<RootStackParamList>();
const isLoggedIn: boolean = false;

onAuthStateChanged(auth, (user) => {
  user ? !isLoggedIn : isLoggedIn
})

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Home" component={Home}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
