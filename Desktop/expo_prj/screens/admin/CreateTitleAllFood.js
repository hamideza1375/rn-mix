import React from 'react'
import Form from '../../Components/Form';

const CreateTitleAllFood = (p) => {
  const sendCreateTitleFood = () => p._admin.createFoodAction()
  return <Form t im {...p} onPress={() => { sendCreateTitleFood() }} />
}
export default CreateTitleAllFood