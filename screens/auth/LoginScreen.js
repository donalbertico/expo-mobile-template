import * as React from 'react'
import {View} from 'react-native'

import {styles} from '../styles'
import { Text } from 'react-native-elements'

import Login from "./components/loginComponent"


export default function LoginScreen(props){

  return(
    <View style={styles.container}>
      <View style={{flex:1}}></View>
      <View style={{flex:2}}>
        <View style={styles.horizontalView}>
          <View style={{flex:1}}></View>
          <View style={{flex:6}}>
            <Login handleToRegister={()=>props.navigation.navigate('register')}
                handleRecoverPassword={()=>props.navigation.navigate('password')}/>
          </View>
          <View style={{flex:1}}></View>
        </View>
      </View>
      <View style={{flex:1}}></View>
    </View>
  )
}
