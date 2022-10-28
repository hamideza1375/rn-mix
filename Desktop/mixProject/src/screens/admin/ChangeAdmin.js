import React from 'react';
import {Form} from '../../Components/Html'

export default function ChangeAdmin(p){
  const sendChangeAdmin = () => p._admin.changeAdmin()
  return <Form ph _input {...p} onPress={() => sendChangeAdmin()} />
}