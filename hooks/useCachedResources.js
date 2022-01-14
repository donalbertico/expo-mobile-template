import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen'
import * as firebase from 'firebase'
import 'firebase/firestore'
import apiKeys from '../constants/apiKeys.js'

export default function useCachedResources(){
  const [auth, setAuth] = React.useState('toLoad')
  const [userInfo,setUserInfo] = React.useState({})
  const [user,setUser] = React.useState()
  const [isNew,setIsNew] = React.useState(false)
  const [authUid, setUid] = React.useState()

  React.useEffect(()=>{
    async function loadResourcesAndDataAsync(){
      try {
        SplashScreen.preventAutoHideAsync();
        firebase.initializeApp(apiKeys.firebase)
        firebase.auth().onAuthStateChanged((authUser)=>{
          if(authUser){
            setUid(authUser.uid)
          }else{
            setAuth(false)
            setUid(false)
            SplashScreen.hideAsync()
          }
        })
      } catch (err) {
        console.warn(err);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  React.useEffect(() => {
    if(authUid) {
      let db = firebase.firestore()
      let userRef = db.collection('users')
      userRef.doc(authUid).get()
          .then((doc)=>{
            console.log('1er ???',doc.id);
            if(doc?.data().email){
              let userInfo = {uid : doc.id, ...doc.data()};
              setUser(userInfo)
              setAuth(true)
              SplashScreen.hideAsync()
            }else{
              userRef.doc(authUid).get()
                  .then((doc)=>{
                    console.log('2 ddd ???',doc.id);
                    if(doc?.data().email){
                      let userInfo = {uid : doc.id, ...doc.data()};
                      setUser(userInfo)
                      setAuth(true)
                      SplashScreen.hideAsync()
                    }
                  })
            }
          })
    }
  }, [authUid])

  return [auth, user]
}
