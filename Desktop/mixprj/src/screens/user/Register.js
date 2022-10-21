import React from 'react';
import Form from '../../Components/Form'

const Register = (p) => {
  const registerSend = () => p._user.registerSendAction();
  const sendCode = () => p._user.registerSendCode();

  return (
      <>
        {!p.changeRegister ?<Form f p ch ph onPress={() => registerSend()} {...p} />
        :
        <Form $code onPress={() => sendCode()} {...p} />}
      </>
  );
};
export default Register
