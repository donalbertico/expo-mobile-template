import * as React from 'react'
import {View,TouchableOpacity} from 'react-native'

import {styles} from './styles'
import { Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {UserProvider, useUser}  from '../context/user-context'
import Logout from './auth/components/logoutComponent'
import EditScreen from './profile/EditScreen.js'

const Tab = createBottomTabNavigator()

function Home(props){
  const [user,setUser] = useUser();

  React.useState(() => {
    console.log(user);
  },[user])

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.horizontalView}>
          <Ionicons name="md-menu" size={32} color='white' onPress={()=>props.navigation.navigate('main', {screen: 'edit'})}/>
          <View style={{flex:5}}></View>
        </View>
      </View>
      <View style={{flex:2}}></View>
      <View style={styles.centeredBox,styles.alignCentered}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('login')}>
          <Text>Wellcome to your app</Text>
          {user? (
            <Text>{user.firstName}</Text>
          ):(
            <Text></Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{flex:3}}></View>
      <View>
        {user?.uid? (
          <View>
            <Text>looged!</Text>
          </View>
        ) : (
            <Text>no logged </Text>
        )}
        <Logout/>
      </View>
    </View>
  )
}

export default function MainScreen(props){

  return(
    <UserProvider user={props.user}>
      <Tab.Navigator screenOptions={{tabBarStyle : {display : 'none'},headerShown:false}}>
        <Tab.Screen name='home' component={Home} />
        <Tab.Screen name='edit'>
          {props => <EditScreen {...props}/>}
        </Tab.Screen>
      </Tab.Navigator>
    </UserProvider>
  )
}
