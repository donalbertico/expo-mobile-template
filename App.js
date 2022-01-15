import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements'
import {theme} from './screens/styles'

import useCachedResources from './hooks/useCachedResources'
import LoginScreen from './screens/auth/LoginScreen.js'
import RegisterScreen from './screens/auth/RegisterScreen.js'
import MainScreen from './screens/MainScreen.js'
import WellcomeScreen from './screens/WellcomeScreen.js'
import LoadingScreen from './screens/LoadingScreen.js'
import PasswordScreen from './screens/auth/PasswordScreen.js'
import Logout from './screens/auth/components/logoutComponent'


const Stack = createStackNavigator();

export default function App(props) {
  const [auth, user] = useCachedResources()
  const [showApp, setShowApp] = React.useState(false)

  React.useEffect(()=>{
    if(auth == true && user?.uid) setShowApp(true)
    if(!auth) setShowApp(false)
  },[auth, user])

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {showApp? (
            <>
              <Stack.Screen name='main'>
                {props => <MainScreen {...props} user={user}/>}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name='login' component={LoginScreen}/>
              <Stack.Screen name='wellcome' component={WellcomeScreen}/>
              <Stack.Screen name='register' component={RegisterScreen}/>
              <Stack.Screen name='loading' component={LoadingScreen}/>
            </>
          )}
          <Stack.Screen name='password' component={PasswordScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
