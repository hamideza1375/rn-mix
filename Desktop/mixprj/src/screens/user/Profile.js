import React from 'react'
import {Button, Img, P, Press, Span} from '../../Components/Html'
import s from './User.module.scss';
import B_icon from '../../Components/B_icon';

const Profile = (p) => {
  const {_scrollView} = p
  p._user._tokenValue()
  p._user.profile()
  const submit = (roomNumber) => p.navigation.navigate('Chat', { roomNumber })
  const imgPicker = (url) => p._user.imagePicker(url)

  return (
        <Span style={{ height:'100%', backgroundColor: '#aaf' }} >
          <Span class={s.headProfile}>
            <Span class={s.viewUserImage}>
              <Span class={s.containImage}>
                <input accept='image/*' className={s.inputFile} type='file' onChange={(event) => { imgPicker(event.target.files[0]) }}/>
                {p.imageProfile ?
                  <Img src={{ uri: `${p.localhost}/upload/profile/${p.imageProfile}` }} class={s.profileImage} />
                  :
                  <Span>
                    <P p={0} class={s.iconPlusImage} >➕ </P>
                    <Img src={require("../../assets/images/user.jpg")} class={s.profileImage} />
                  </Span>
                }
                <Span>
                  <P p={0} class={s.textUserImage}>{p.tokenValue?.fullname}</P>
                </Span>
              </Span>
            </Span>
            <Span w='70%'  >
              <Span class={s.containHeaderInfo} >
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='search' size={.85} bgcolor='silver' />
              </Span>
            </Span>
          </Span>
          <_scrollView contentContainerStyle={{height:200}} style={{height:'100%'}} >
              <Span class={s.bodyProfile} >
              <Press onClick={() =>  alert('room8')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <P p={0} fontSize={17} >انتقادات و پیشنهادات</P>
                </Press>
                <Press onClick={() => submit('room7')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <P p={0} style={{ fontSize: 17 }} >ارتباط با ادمین </P>
                </Press>
                <Press style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <P p={0} /* onPress={() => submit('room7')} */ style={{ fontSize: 17 }} >گفتگو</P>
                </Press>  
                {p.tokenValue.isAdmin === 'chief' ? <Button bgcolor='#555' class={[s.btnPanel]} onPress={() => p.navigation.navigate("AdminTitleAllFood")} >پنل ادمین</Button> : <P p={0} />}
              </Span>
            </_scrollView>
        </Span>
  )
}
export default Profile
