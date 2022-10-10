import React from 'react';
import { View } from 'react-native';
import Frame from '../../Components/Frame';
import styles from './styles/User.js';

function Payment(p) {
  return (
    <View style={styles.container2}>
      <Frame style={styles.container2} source={{ uri: p.route.params.uri }} />
    </View>
  )
}
export default Payment;
