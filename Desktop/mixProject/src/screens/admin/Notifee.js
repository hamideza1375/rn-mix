import React from 'react';
import {Form} from '../../Components/Html'

const Notifee = (p) => {
  const createNotifee = () => p._admin.notifee()
  return <Form t i {...p} onPress={createNotifee} />
}
export default Notifee
