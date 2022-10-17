import React from 'react';
import { View } from 'react-native';
import Card from './components/Card'

function App() {
  return (
    <View>
      <Card
        // alert={true}
        // imgStyle={{top:5}}
        // bgcolor='green'
        // border={'red'}
        // direction={'ltr'}
        // color='red'
        header={'salam salam'}
        body={'salam salam'}
        footer={'salam  salam'}
        img={require('./assets/images/logo.png')}
        style={{width:'60%'}}
      />
    </View>
  )
}

export default App;