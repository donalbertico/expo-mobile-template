import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements'
import {theme} from './screens/styles'

import LoginScreen from './screens/auth/LoginScreen.js'


const Stack = createStackNavigator();

export default function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer initialRouteName='login' >
        <Stack.Navigator>
          <Stack.Screen name='login' component={LoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      <View >
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
