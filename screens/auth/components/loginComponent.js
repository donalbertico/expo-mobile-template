import React from 'react'
import firebase from 'firebase'

import {styles} from '../../styles'
import {Input,Text,Button} from 'react-native-elements'
import {View, TouchableOpacity} from 'react-native'


export default function Login({handleToRegister,handleToLoading,handleToHome}) {

  const [email, setEmail] = React.useState('')
  const [password, setPass] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  handleLogin = () => {
    setLoading(true)
    firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => {
          handleToHome()
          setLoading(false)  
        })
        .catch((err) => {
          console.warn(err);
        })
  }


    return (
      <View style={styles.horizontalView}>
        <View style={{flex:1}}></View>
        <View style={{flex:5}}>
          <Input placeholder = 'Email' value={email} onChangeText={email => setEmail(email)}/>
          <Input placeholder = 'Password' value={password} onChangeText={password => setPass(password)}/>
          <View style={styles.horizontal}>
            <Button title='login' onPress={handleLogin}/>
            <TouchableOpacity onPress={()=>handleToRegister()}>
              <Text>register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1}}></View>
      </View>
    )

}
