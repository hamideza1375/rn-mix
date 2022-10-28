import React from 'react'
import { Platform } from 'react-native';
import {B_icon,Button, Img, P, Press, Scroll, Span} from '../../Components/Html'
import s from './User.module.scss';
import {imagePicker} from '../../utils/imagePicer'
import share from '../../utils/share'

const Profile = (p) => {
  p._food.getImageProfile()
  p._user._tokenValue()
  p._user.profile()
  const submit = (roomNumber) => p.navigation.navigate('Chat', { roomNumber })
  const imgPicker = (url) => p._user.imagePicker(url)

  return (
        <Span style={{ height:'100%', backgroundColor: '#aaf' }} >
          <Span class={s.headProfile}>
            <Span class={s.viewUserImage}>
              <Span onClick={()=>{
                imagePicker().then((url)=>{
                  imgPicker(url)
                })
                }} class={s.containImage}>
              { Platform.OS === 'web' && <input style={{cursor:'pointer'}} accept='image/*' className={s.inputFile} type='file' onChange={(event) => { imgPicker(event.target.files[0]) }}/>}
                {p.imageProfile ?
                  <Img src={{ uri: `${p.localhost}/upload/profile/${p.imageProfile}` }} class={s.profileImage} containClass={s.profileImage} />
                  :
                  <Span>
                  <Span class={s.iconPlusImage} nativeStyle={{justifyContent:'center', transform:[{scale:.9}]}} webStyle={{width:25,height:27.5}} >
                    <P ta='center' fs={18} >➕</P>
                  </Span>
                   
                    <Img src={require("../../assets/images/user.jpg")} class={s.profileImage} containClass={s.profileImage} />
                  </Span>
                }
                <Span style={{top:2}} >
                  <P p={0} class={s.textUserImage}>{p.tokenValue?.fullname}</P>
                </Span>
              </Span>
            </Span>
            <Span w='70%'  >
              <Span class={s.containHeaderInfo} >
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='share-alt' size={.85} bgcolor='silver' onClick={async()=>{share('http://localhost:3000', 'فسفود کاکتوس')}}
                />
              </Span>
            </Span>
          </Span>
          <Scroll contentContainerStyle={{flexGrow:1}} style={{height:'100%'}} >
              <Span class={s.bodyProfile} >
              <Press onClick={() =>p.navigation.navigate('SendProposal')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <P p={0} fontSize={27} >ارسال انتقادات و پیشنهادات</P>
                </Press>
                {p.tokenValue.isAdmin === 'chief' ?
                 <Button bgcolor='#555' w={'100%'} mt='auto' onClick={() => p.navigation.navigate("AdminTitleAllFood")} >پنل ادمین</Button> : <P p={0} />}
              </Span>
            </Scroll>
        </Span>
  )
}
export default Profile
