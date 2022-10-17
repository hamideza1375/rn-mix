import React from 'react';
import { View } from 'react-native-web';
import Form from '../../Components/Form'

const Register = (p) => {
  const registerSend = () => p._user.registerSendAction();
  const sendCode = () => p._user.registerSendCode();

  return (
      <View flex={1} >
        {!p.changeRegister ?<Form f p ch ph onPress={() => registerSend()} {...p} />
        :
        <Form $code onPress={() => sendCode()} {...p} />}
      </View>
  );
};
export default Register
