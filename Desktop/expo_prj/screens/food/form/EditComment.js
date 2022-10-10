import React, { useEffect } from 'react';
import Form from '../../../Components/Form';
import { useNavigation } from '@react-navigation/native';

export const EditComment = ({ id3, props: p }) => {
  const { showForm } = p
  p._food.getEditComment(id3);
  const navigation = useNavigation();
  useEffect(() => navigation.setOptions({ headerRight: () => <></> }), [showForm, id3]);
  return <Form bgcolor='#fff' m s {...p} onPress={() => p._food.editComment(id3)} />
};
