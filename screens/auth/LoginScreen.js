import * as React from 'react'
import {View} from 'react-native'

import {styles} from '../styles'
import { Text } from 'react-native-elements'

import {Login} from "./components/loginComponent"

export default function LoginScreen(props){

  return(
    <View style={styles.container}>
      <View>
        <Text>Log in</Text>
        <Login/>
      </View>
    </View>
  )
}
