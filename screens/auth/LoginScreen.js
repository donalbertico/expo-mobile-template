import * as React from 'react'
import * as fb from 'expo-facebook'
import * as Google from 'expo-auth-session/providers/google'
import * as firebase from 'firebase'
import 'firebase/firestore'
import {styles} from '../styles'
import { useAssets } from 'expo-asset'
import { View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Input, Text , Button, Image } from 'react-native-elements'

export default function LoginScreen(props){
  const [email, setEmail] = React.useState('')
  const [password, setPass] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error,setError] = React.useState('')
  const [assets, err] = useAssets([
    require('../../assets/facebookLogo.png'),
    require('../../assets/googleLogo.png')])
  const [request, googleResponse, promptAsync] = Google.useAuthRequest({
    expoClientId : "795853275646-ae8uvd3aq1h31pf5uflniq4o5mu3vhik.apps.googleusercontent.com",
    iosClientId : "795853275646-rt73098b5dt37oqt6nk7o8925d339iv9.apps.googleusercontent.com"
  })

  const handleLogin = () => {
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
  const handleGoogle = () => {
    setLoading(true)
    promptAsync()
  }
  const handleFbLogin = () => {
    async function fblog(){
      try {
        await fb.initializeAsync({ appId: '426169569075169'})
        const {type, token} = await fb.logInWithReadPermissionsAsync()
        if(type == 'success'){
          const credential = firebase.auth.FacebookAuthProvider.credential(token)
          if (credential) {
            console.log(credential);
            firebase.auth().signInWithCredential(credential)
            .then((doc) => {
              doc.user.provider = 'fb'
              saveUser(doc.user)
            })
            .catch((e) => {
              console.log(e);
              setError(e.message)
              setLoading(false)
            })
          }
        }else {
          setLoading(false)
        }
      } catch (e) {
        console.log(e);
        setLoading(false)
      }
    }
    fblog()
    setLoading(true)
  }
  const saveUser = (newUser) => {
    let db = firebase.firestore();
    let displayName = newUser.displayName.split(' ')
    let user = {
      uid : newUser.uid,
      firstName : displayName[0],
      email : newUser.email
    }
    if(displayName[1]) user.lastName = displayName[1]
    if(newUser.photoURL) user.picture = newUser.photoURL
    setUser(user)
    let ref = db.collection('users').doc(newUser.uid)
    ref.get().then((doc) => {
      if (!doc.exists) ref.set(user).catch((e) => {console.log(e)})
    })
  }
  React.useEffect(() => {
    if(googleResponse?.params?.access_token){
      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleResponse.params.id_token,
        googleResponse.params.access_token
      )
      if(credential) {
        let auth = firebase.auth().signInWithCredential(credential)
            .then((doc) => {
              doc.user.provider = 'google'
              saveUser(doc.user)
            })
            .catch((e) => {
              console.log(e);
              setError(e.message)
              setLoading(false)
            })
      }
    }else {
      setLoading(false)
    }
  },[googleResponse])

  return(
    <View style={styles.container}>
      <View style={{flex:1}}></View>
      <View style={{flex:2}}>
        <View style={styles.horizontalView}>
          <View style={{flex:1}}></View>
          <View style={{flex:6}}>
          <View>
            <TouchableOpacity onPress={handleGoogle}>
              <Image style={styles.authProviders} source={require('../../assets/googleLogo.png')}/>
            </TouchableOpacity>
            <View style={{flex:2}}></View>
            <TouchableOpacity onPress={handleFbLogin}>
              <Image style={styles.authProviders} source={require('../../assets/facebookLogo.png')}/>
            </TouchableOpacity>
          </View>
          {loading?(
            <ActivityIndicator/>
          ):(
            <>
              <Text>{error}</Text>
              <Input placeholder = 'Email' value={email} onChangeText={email => setEmail(email)}/>
              <Input placeholder = 'Password' value={password} secureTextEntry={true} onChangeText={password => setPass(password)}/>
              <Button title='login' onPress={handleLogin}/>
              <View style={styles.horizontalView}>
                <View style={{flex:1}}></View>
                <TouchableOpacity onPress={()=>handleRecoverPassword()}>
                  <Text style={{marginTop:10}}>forgot my password</Text>
                </TouchableOpacity>
              </View>
             <View style={styles.topMarginCentered}>
                <Text>Or</Text>
              </View>
              <View style={styles.topMarginCentered}>
                  <TouchableOpacity onPress={()=>handleToRegister()}>
                    <Text h4>Register</Text>
                  </TouchableOpacity>
              </View>
            </>
          )}
          </View>
          <View style={{flex:1}}></View>
        </View>
      </View>
      <View style={{flex:1}}></View>
    </View>
  )
}
