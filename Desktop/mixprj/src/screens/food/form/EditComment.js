import React, { useEffect } from 'react';
import Form from '../../../Components/Form';

export const EditComment = (p) => {
  p._food.getEditComment(p.id3);
  p._food.unmountComment();
  useEffect(() => p.navigation.setOptions({ headerRight: () => <></> }), [p.showForm, p.id3]);
  return <Form mt={10} mAutoFocus bgcolor='#fff' m s c {...p} onPress={() => p._food.editComment(p.id3)} />
};
