import React, { useEffect } from 'react';
import Form from '../../../Components/Form';

export const CreateComment = (p) => {
  p._food.unmountComment();
  useEffect(() => p.navigation.setOptions({ headerRight: () => <></> }), [p.showForm2]);
  return <Form mAutoFocus mt={15} m s c {...p} onPress={() => p._food.sendComment()} />
};
