import React from 'react'
import firebase from 'firebase'

import {View, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-elements'

export default function Logout({handleLogout}) {

  _logout = () =>{
    firebase.auth().signOut()
    handleLogout()
  }

  return(
    <View>
      <TouchableOpacity onPress={()=> _logout()}>
        <Text>bye</Text>
      </TouchableOpacity>
    </View>
  )
}
