import * as React from 'react'

const UserContext = React.createContext()

function userReducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
        return {...action.value}
      break;
  }
}

function UserProvider(props) {
  const [state, dispatch] = React.useReducer(userReducer, props.user)
  const value = React.useMemo(() => [state, dispatch], [state])
  return <UserContext.Provider value={value} {...props} />
}

function useUser() {
  const context = React.useContext(UserContext)
  if(!context) {
    throw new Error('useUser must be used within context')
  }

  const [state, dispatch] = context
  const update = (value) => dispatch({type : 'UPDATE',value})
  return [
    state,
    update,
  ]
}


export {UserProvider, useUser}
