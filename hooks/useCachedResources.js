import * as React from 'react';
import * as firebase from 'firebase'

import apiKeys from '../constants/apiKeys.js'
import useUserRead from './useUserRead'
import useUserStore from './useUserStore'

export default function useCachedResources(){
  const [auth, setAuth] = React.useState(false)
  const [setUser] = useUserStore()
  const [user,setUser] = useUserRead()

  React.useEffect(()=>{
    async function loadResourcesAndDataAsync(){
      try {
        firebase.initializeApp(apiKeys.firebase)
        firebase.auth().onAuthStateChanged((authUser)=>{
          if(authUser){
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

  return [auth]
}
