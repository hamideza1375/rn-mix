import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Modal from './components/Modal'
import {Button} from './components/Html'
import Card from './components/Card'


function App() {

  const [show, setShow] = useState(false);


  return (
    <SafeAreaView style={{ width: '100%', alignItems: 'center', marginTop: 80 }} >
      <Button onPress={() => setShow(true)} >onclik</Button>

      <Modal style={{width:333, height:150}} setShow={setShow} show={show}>
        <Text style={{fontSize:16, fontWeight:'bold'}} >salam salam</Text>
        <View>
          <Card bgcolor="blue" header={'salam salam'}
           style={{width:300,justifyContent: 'center',alignItems:'center',
           marginTop:8
           }} />
        </View>
      <Button outline style={{fontSize:14, width:111,marginTop:10}}>Send</Button>
      </Modal>

    </SafeAreaView>
  )
}



export default App;