import React from 'react'
import { Text } from 'react-native';
import LinearGradient from './components/LinearGradient';


export default function App() {
  return (
    <LinearGradient start={{ x: 1.5 }} colors={['blue','red','green']}>
      <Text >Sign in with Facebook</Text>
      <Text >Sign in with Facebook</Text>
      <Text >Sign in with Facebook</Text>
    </LinearGradient>
  )
}
