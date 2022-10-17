import React from 'react'
import { SafeAreaView, View } from 'react-native'
import B_icon from './components/B_icon'


const App = () => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <B_icon icon='youtube' />
        <B_icon size={.6} color="silver" bgcolor="red" icon='youtube' />
      </View>
    </SafeAreaView>
  )
}

export default App