import React from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import Swiper from "./components/Swiper";



const App = () => {

  return (
    <Swiper
      width={300}
      iconLeft={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>}
      iconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>}
    >
      <TextInput style={{ width: '100%', height: 50, borderWidth: 1, backgroundColor: '#fff' }} />
    </Swiper>
  )


}

export default App