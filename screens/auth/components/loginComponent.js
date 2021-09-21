import React, {Component} from 'react'
import {View} from 'react-native'

import { Input, Text , Button} from 'react-native-elements'


export class Login extends Component {

  render(){
    return (
      <View>
        <Input placeholder = 'Email' />
        <Input placeholder = 'Password'/>
        <Button title='login'/>
      </View>
    )
  }
}

export default Login;
