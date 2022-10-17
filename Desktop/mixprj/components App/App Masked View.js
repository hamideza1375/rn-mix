import React from 'react'
import { Text } from 'react-native'
import MaskedView from './components/MaskedView'


const App = () => {
  return (
    <>
      <MaskedView source={require("./assets/a1.png")} >
        <Text style={{fontSize:60}}>dsrf</Text>
      </MaskedView>

      <MaskedView colors={['red','blue', 'green']} >
        <Text style={{fontSize:70}}>dsrf</Text>
      </MaskedView>
    </>
  )
}






export default App
