import React from 'react'
import {Form} from '../../Components/Html';

const CreateTitleAllFood = (p) => {
  const sendCreateTitleFood = () => p._admin.createTitleFood()
  return <Form t im {...p} onPress={() => { sendCreateTitleFood() }} />
}
export default CreateTitleAllFood