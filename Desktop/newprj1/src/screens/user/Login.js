import React from 'react';
import { Text } from 'react-native'
import { View } from 'react-native';
import Form from '../../Components/Form'

const Login = (p) => {  
  p._user.mountLogin()
  const sendLogin = () => p._user.sendLoginAction()
  
  return (
        <Form p c ch ph checkText="مرا بخاطر بسپار" onPress={() => { p.setchange(!p.change); sendLogin(); }} {...p}>
          <Text onPress={() => p.navigation.navigate('ForgetPass')} >فراموشی رمز عبور</Text>
        </Form>
  )
}
export default Login
