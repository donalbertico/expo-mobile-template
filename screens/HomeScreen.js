import * as React from 'react'
import {View,TouchableOpacity} from 'react-native'

import {styles} from './styles'
import { Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

import useUserRead from '../hooks/useUserRead'
import Logout from './auth/components/logoutComponent'


export default function HomeScreen(props){

  const [user,setUser] = useUserRead('get');

  React.useEffect(()=>{
    if(props.route.params?.userUpdate)setUser('get')
  },[props.route.params])

  React.useEffect(()=>{
    if(user == 'get' || user.destroyed){setUser('get')}
  },[user])

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.horizontalView}>
          <Ionicons name="md-menu" size={32} color='white' onPress={()=>props.navigation.navigate('edit')}/>
          <View style={{flex:5}}></View>
        </View>
      </View>
      <View style={{flex:2}}></View>
      <View style={styles.centeredBox,styles.alignCentered}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('login')}>
          <Text>Wellcome to your app</Text>
          {user? (
            <Text>{user.displayName}</Text>
          ):(
            <Text></Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{flex:3}}></View>
      <View>
        {user.uid? (
          <View>
            <Text>looged!</Text>
            <Logout/>
          </View>
        ) : (
            <Text>no logged </Text>
        )}
      </View>
    </View>
  )
}
