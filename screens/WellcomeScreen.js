import * as React from 'react'
import {View,TouchableOpacity} from 'react-native'

import {styles} from './styles'
import {Text} from 'react-native-elements'

export default function WellcomeScreen(props){
  return (
    <View style={styles.container}>
      <View style={{flex:2}}></View>
      <View style={styles.centeredBox,styles.alignCentered}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('login')}>
          <Text>Wellcome to your app</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:2}}></View>
    </View>
  )
}
