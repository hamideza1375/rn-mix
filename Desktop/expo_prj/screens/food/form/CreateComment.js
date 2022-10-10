import React, { useEffect } from 'react';
import Form from '../../../Components/Form';
import { useNavigation } from '@react-navigation/native';

export const CreateComment = ({ props: p }) => {
  const navigation = useNavigation();
  useEffect(() => navigation.setOptions({ headerRight: () => <></> }), [p.showForm2]);
  return <Form mt={15} m s c {...p} onPress={() => p._food.sendComment()} />
};
