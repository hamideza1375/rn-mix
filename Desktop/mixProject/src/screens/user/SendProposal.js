import React from 'react';
import {Form} from '../../Components/Html';

export default function SendProposal (p) {
  return <Form mAutoFocus m c {...p} onPress={() => p._user.sendProposal()} />
};

