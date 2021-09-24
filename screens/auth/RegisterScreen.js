import * as React from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'

import {View, ActivityIndicator} from 'react-native'
import { Input, Text , Button} from 'react-native-elements'
import {styles} from '../styles'

import useUserStore from '../../hooks/useUserStore'

export default function RegisterScreen(props){
  const db = firebase.firestore();

  const [email,setEmail] = React.useState('')
  const [password,setPass] = React.useState('')
  const [name,setName] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const [setUser] = useUserStore()

  handleRegister = ()=> {
    setLoading(true)
    firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(credentials => {
          const user = {
            uid : credentials.user.uid,
            email : email,
            name : name
          }
          db.collection('users').doc(user.uid).set({
            name:name
          })
          .then(()=>{
            setUser(user)
            props.navigation.navigate('home',{userUpdate : true})
            setLoading(false)
          })
        })
        .catch((e) => {
          console.warn(e);
          props.navigation.goBack()
        })
  }

  return(
    <View style={styles.container}>
      <View style={{flex:1}}></View>
      {!loading? (
        <View style={styles.alignCentered,{flex:2}}>
          <Input placeholder='name'onChangeText={(name)=>setName(name)}></Input>
          <Input placeholder='email'onChangeText={(email)=>setEmail(email)}></Input>
          <Input placeholder='password' value={password} onChangeText={(password)=>setPass(password)}></Input>
          <Input placeholder='repeat password'></Input>
          <Button title='register'onPress={handleRegister}/>
        </View>
      ):(
        <ActivityIndicator />
      )}
      <View style={{flex:1}}></View>
    </View>
  )
}
