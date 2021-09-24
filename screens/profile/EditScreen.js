import * as React from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'

import {View,ActivityIndicator} from 'react-native'
import {Input,Text,Button} from 'react-native-elements'
import {styles} from '../styles'

import useUserStore from '../../hooks/useUserStore'
import useUserRead from '../../hooks/useUserRead'

export default function EditScreen(props){
  const db = firebase.firestore();

  const [email,setEmail] = React.useState('')
  const [password,setPass] = React.useState('')
  const [name,setName] = React.useState('')
  const [loading,setLoading] = React.useState(false)
  const [user] = useUserRead('get')
  const [setUser] = useUserStore()

  handleEdit = ()=> {
    setLoading(true)
    let ref = db.collection('users').doc(user.uid)
    ref.set({name : name})
      .then(()=>{
        let update = {
          uid : user.uid,
          name : name
        }
        setUser(update)
        props.navigation.navigate('home',{userUpdate : true})
        setLoading(false)
      })
  }

  React.useEffect(()=>{
    setName(user.name)
  },[user])

  return(
    <View style={styles.container}>
      {!loading? (
          <>
            <View style={{flex:1}}></View>
            <View style={{flex:2},styles.horizontalView}>
              <View style={{flex:1}}></View>
              <View style={{flex:4}}>
                <Input placeholder='name' value={name} onChangeText={(name)=>setName(name)}></Input>
                <Button title='edit' onPress={handleEdit}/>
              </View>
              <View style={{flex:1}}></View>
            </View>
            <View style={{flex:3}}></View>
          </>
      ):(
        <ActivityIndicator />
      )}
    </View>
  )
}
