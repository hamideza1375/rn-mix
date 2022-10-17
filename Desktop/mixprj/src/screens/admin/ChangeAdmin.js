import React from 'react';
import Form from '../../Components/Form'

export default function ChangeAdmin(p){
  const sendChangeAdmin = () => p._admin.changeAdmin()
  return <Form ph _input {...p} onPress={() => sendChangeAdmin()} />
}