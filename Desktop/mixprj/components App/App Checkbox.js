import React, {useState} from 'react';
import { View } from 'react-native';
import {CheckBox} from './Components/Html';



function App() {
  const [show, setShow] = useState(false)


  return (
      <View style={{ flex:1,margin:100,backgroundColor: 'silver', alignItems:'center', justifyContent:'center' }} >
        <CheckBox show={show} setshow={setShow} style={{ margin: 4 }} />
      </View>
  )
}



export default App;