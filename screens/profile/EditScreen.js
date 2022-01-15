import * as React from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'

import {View,ActivityIndicator,TouchableOpacity} from 'react-native'
import {Input,Text,Button} from 'react-native-elements'
import {styles} from '../styles'

import {UserProvider, useUser} from '../../context/user-context'

export default function EditScreen(props){
  const db = firebase.firestore();

  const [email,setEmail] = React.useState('')
  const [name,setName] = React.useState('')
  const [lastName,setLastName] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const [user, setUser] = useUser()

  handleEdit = ()=> {
    setLoading(true)
    let ref = db.collection('users').doc(user.uid)
    const authUser = firebase.auth().currentUser
    let newInfo = {firstName : name, lastName : lastName}
    ref.update(newInfo)
      .then(()=>{
        setUser({...user, ...newInfo})
        props.navigation.navigate('main', {screen : 'home'})
        setLoading(false)
      })
      .catch( (e) => {
        console.log(e);
        setLoading(false)
      })
  }

  React.useEffect(()=>{
    setName(user.firstName)
    setLastName(user.lastName)
  },[user])

  return(
    <View style={styles.container}>
      <View style={{flex:1}}></View>
      {!loading? (
          <View style={{flex:2},styles.horizontalView}>
            <View style={{flex:1}}></View>
            <View style={{flex:4}}>
              <View style={styles.horizontalView}>
                <View style={{flex:1,marginBottom:50}}></View>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('password',{change:true})}}>
                  <Text>Change password</Text>
                </TouchableOpacity>
              </View>
              <Input placeholder='name' value={name} onChangeText={(name)=>setName(name)}></Input>
              <Input placeholder='last name' value={lastName} onChangeText={(lastName)=>setLastName(lastName)}></Input>
              <Button title='edit' onPress={handleEdit}/>
            </View>
            <View style={{flex:1}}></View>
          </View>
      ):(
        <ActivityIndicator />
      )}
      <View style={{flex:3}}></View>
    </View>
  )
}
