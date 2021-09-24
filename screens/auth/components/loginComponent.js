import React from 'react'
import firebase from 'firebase'

import {styles} from '../../styles'
import {Input,Text,Button} from 'react-native-elements'
import {View, TouchableOpacity,ActivityIndicator} from 'react-native'


export default function Login({handleToRegister}) {

  const [email, setEmail] = React.useState('')
  const [password, setPass] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error,setError] = React.useState('')

  handleLogin = () => {
    setLoading(true)
    firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then(() => {
          setLoading(false)
        })
        .catch((e) => {
          console.warn(e);
          setError(e.message)
          setLoading(false)

        })
  }


    return (
      <View style={styles.horizontalView}>
        <View style={{flex:1}}></View>
        {loading?(
          <ActivityIndicator/>
        ):(
          <View style={{flex:5}}>
            <Text>{error}</Text>
            <Input placeholder = 'Email' value={email} onChangeText={email => setEmail(email)}/>
            <Input placeholder = 'Password' value={password} onChangeText={password => setPass(password)}/>
            <View style={styles.horizontal}>
              <Button title='login' onPress={handleLogin}/>
              <TouchableOpacity onPress={()=>handleToRegister()}>
                <Text>register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={{flex:1}}></View>
      </View>
    )

}
