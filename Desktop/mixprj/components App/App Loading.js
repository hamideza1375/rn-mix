import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Loading from './components/Loading'



function App() {


  return (
    <SafeAreaView>
      <View style={{ marginTop: 99 }} >
        <View style={{ position: 'relative' }} >
          <Loading size={11} color={"red"} style={{margin:4}} />
        </View>
      </View>
    </SafeAreaView>
  )
}



export default App;