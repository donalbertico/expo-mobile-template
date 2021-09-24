import * as React from 'react';
import * as firebase from 'firebase'
import 'firebase/firestore'

import apiKeys from '../constants/apiKeys.js'
import useUserRead from './useUserRead'
import useUserStore from './useUserStore'

export default function useCachedResources(){
  const [auth, setAuth] = React.useState('toLoad')
  const [userInfo,setUserInfo] = React.useState({})
  const [setUser] = useUserStore()
  const [user] = useUserRead('get')
  const [isNew,setIsNew] = React.useState(false)

  React.useEffect(()=>{
    async function loadResourcesAndDataAsync(){
      try {
        firebase.initializeApp(apiKeys.firebase)
        firebase.auth().onAuthStateChanged((authUser)=>{
          if(authUser){
            if(authUser.metadata.creationTime == authUser.metadata.lastSignInTime){
              setIsNew(true)
            }
            setUserInfo({
              uid:authUser.uid,
              email:authUser.email,
              displayName:authUser.displayName})
            setAuth(true)
          }else{
            setAuth(false)
          }
        })
      } catch (err) {
        console.warn(err);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  React.useEffect(()=>{
    if(auth==true&&!user.uid){
      if(!isNew){
        let db = firebase.firestore()
        let userRef = db.collection('users')
        userRef.doc(userInfo.uid).get()
            .then((doc)=>{
              let newInfo =  Object.assign({},userInfo,{description:doc.description})
              setUserInfo(newInfo)
              setUser(userInfo)
            })
      }

    }else if (!auth) {
      setUser({destroyed : true})
      console.log('deleting');
    }
  },[user,auth])

  return [auth]
}
