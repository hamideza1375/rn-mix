import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Form from './components/Form';


function App() {

  const [fullname, setFullname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [checkbox, setCheckbox] = useState()
  const [message, setMessage] = useState()
  const [captcha, setCaptcha] = useState(true)

  return (
    <SafeAreaView style={{ direction: 'rtl' }}>
      <View style={{ marginVertical: 30, }} >
        <Form
          f e p cP
          fSwiper
          fIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
          fIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>}
          size={1}
          captcha={captcha} setCaptcha={setCaptcha} host="192.168.42.34"
          fullname={fullname} setFullname={setFullname}
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
          checkbox={checkbox} setCheckbox={setCheckbox}
          message={message} setMessage={setMessage}
          onPress={() => alert('goood')}
        >
          فراموشی رمز عبور
        </Form>
      </View>

    </SafeAreaView>
  )
}



export default App;