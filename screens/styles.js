import { StyleSheet } from 'react-native'

const theme = {
  colors : {
    primary : '#FF5722'
  }
}

const styles = StyleSheet.create({
  container :{
    flex : 1
  },
  centered : {
    flex : 5
  },
  alignCentered:{
    alignItems : 'center',
    justifyContent : 'center'
  },
  horizontalView:{
    flexDirection : 'row'
  },
  header:{
    backgroundColor: theme.colors.primary,
    justifyContent : 'center',
    flex:1
  },
  topMarginCentered:{
    marginTop : 20,
    alignItems : 'center'
  }
})


export {styles, theme}
