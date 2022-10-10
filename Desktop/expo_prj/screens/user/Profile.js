import React from 'react'
import { Text, View, Image } from 'react-native'
import {Button} from '../../Components/Html'
import styles from './styles/User.js';
import B_icon from '../../Components/B_icon';
import { _scrollView } from '../food/Home'
import {localhost} from '../../utils/axios/axios'

const Profile = (p) => {
  p._user._tokenValue()
  p._user.profile()
  const submit = (roomNumber) => p.navigation.navigate('Chat', { roomNumber })
  const imgPicker = (url) => p._user.imagePicker(url)

  return (
        <View style={{ height:'100%', backgroundColor: '#aaf' }} >

          <View style={[styles.headProfile, { height: 167 }]}>
            <View style={styles.viewUserImage}>
              <View  style={styles.containImage}>
                <input style={{position:'absolute',zIndex:111, borderRadius: 22,
                 minHeight: 100,opacity:0,width: 100,maxWidth: '95%',
                 marginTop: 8,border:'2px solid red'}} type='file' onChange={(event) => { imgPicker(event.target.files[0]) }}/>
                {p.imageProfile ?
                  <Image source={{ uri: `${localhost}/upload/profile/${p.imageProfile}` }} style={styles.profileImage} />
                  :
                  <Image source={require("../../assets/images/user.jpg")} style={styles.profileImage} />
                }
                <View style={styles.profileSubText}>
                  <Text style={styles.textUserImage}>{p.tokenValue?.fullname}</Text>
                </View>
              </View>
            </View>
            <View style={{ width: '70%' }} >
              <View style={styles.containHeaderInfo} >
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='search' size={.85} bgcolor='silver' />
              </View>
            </View>
          </View>
          <_scrollView >
            {/* <View style={styles.hr} /> */}
            <_scrollView style={{minHeight:100,height:100}} >
              <View style={[styles.bodyProfile]} >
                <View onStartShouldSetResponder={() =>  submit('room8')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text style={{ fontSize: 17 }} >انتقادات و پیشنهادات</Text>
                </View>
                <View onStartShouldSetResponder={() => submit('room7')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text style={{ fontSize: 17 }} >ارتباط با ادمین </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text /* onPress={() => submit('room7')} */ style={{ fontSize: 17 }} >گفتگو</Text>
                </View> 
          
                {p.tokenValue.isAdmin === 'chief' ? <Button style={[styles.btnPanel,{textAlign:'center'}]} onPress={() => p.navigation.navigate("AdminTitleAllFood")} >پنل ادمین</Button> : <Text />}
              </View>
            </_scrollView>
          </_scrollView>

        </View>
  )
}
export default Profile
