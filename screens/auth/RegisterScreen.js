import * as React from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'
import {View, ActivityIndicator} from 'react-native'
import { Input, Text , Button} from 'react-native-elements'
import {styles} from '../styles'

export default function RegisterScreen(props){
  const db = firebase.firestore();

  const [email,setEmail] = React.useState('')
  const [error,setError] = React.useState('')
  const [password,setPass] = React.useState('')
  const [repeat,setRepeat] = React.useState('')
  const [name,setName] = React.useState('')
  const [loading,setLoading] = React.useState(false)

  handleRegister = ()=> {
    if(password != repeat){
      setError('passwords must match')
      return;
    }
    setLoading(true)
    firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then(credentials => {
          credentials.user.updateProfile({
                displayName : name
              })
              .then(()=>{
                db.collection('users').doc(credentials.user.uid).set({
                      firstName : name,
                      lastName : name,
                      email : email
                    })
                    .then(()=>{
                      setLoading(false)
                    })
                  })
                  .catch((e) => {
                    console.warn(e);
                    setLoading(false)
                  })
              },(e)=>{
                console.warn(e)
                setLoading(false)
                setError(e.message)
              })
  }

  return(
    <View style={styles.container}>
      <View style={{flex:1}}></View>
      {!loading? (
        <View style={{flex:5}}>
          <View style={styles.horizontalView}>
            <View style={{flex:1}}></View>
            <View style={{flex:6}}>
              <Text>{error}</Text>
              <Input placeholder='name'onChangeText={(name)=>setName(name)}></Input>
              <Input placeholder='email'onChangeText={(email)=>setEmail(email)}></Input>
              <Input placeholder='password' value={password} secureTextEntry={true} onChangeText={(password)=>setPass(password)}></Input>
              <Input placeholder='repeat password' value={repeat} secureTextEntry={true} onChangeText={(repeat)=>setRepeat(repeat)}></Input>
              <Button title='register'onPress={handleRegister}/>
            </View>
            <View style={{flex:1}}></View>
          </View>
        </View>
      ):(
        <ActivityIndicator />
      )}
      <View style={{flex:1}}></View>
    </View>
  )
}
