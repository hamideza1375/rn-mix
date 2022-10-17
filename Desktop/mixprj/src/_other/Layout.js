import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react'
import { Platform, Animated, Text, Pressable, View } from 'react-native';
import TopTab from '../Components/TopTab';
import BottomTab from '../Components/BottomTab';
import Drawer from '../Components/Drawer';

export const Layout = (p) => {

  useFocusEffect(useCallback(() => {
    return () => {
      if (p._key === '100') { p.setnavigateProfile(p.route.name) }
      if (p._key === '120') { p.setnavigateUser(p.route.name) }
    }
  }, []))
  const drawer =  [{name:'Profile',title:'پروفایل'}, {name:'Logout', title:'خروج'}]
  const topUser = [{name:'Register', title:'ثبت نام'}, {name:'Login',title:'ورود'}]

  let bottom = (p.tokenValue.isAdmin !== 'courier') ?
    ([{ title: 'Home', icon: 'home', navigate: null }, 
    p.tokenValue.fullname ? 
    { title: (p._key == '100') ?
     p.route.name : 'Profile', icon: 'user', navigate: p.route.name ===  'Profile' || p.route.name ===  'Logout'?p.route.name: p.navigateProfile }
     :
      { title: (p._key == '120') ?
       p.route.name : 'Register', icon: 'user', navigate:p.route.name === 'Login'|| p.route.name === 'Register'?p.route.name: p.navigateUser }])
    :
    (p.tokenValue.fullname ? []
       : [{ title: 'Home', icon: 'home', navigate: null }, { title: (p._key == '120') ? p.route.name : 'Register', icon: 'user', navigate: p.navigateUser }])

  return (
    p.route.name === 'Profile' | p.route.name === 'Login' | p.route.name === 'Register' | p.route.name === 'Home' ?
      <Animated.View style={[
        (Platform.OS === 'ios') ?
          p.width < p.height ?
            { paddingTop: 40, flex: 1, backgroundColor: p.route.name === 'Profile' ? '#bbf' : '#fff' }
            :
            { paddingHorizontal: 40 / 1.5, paddingTop: 10, flex: 1, backgroundColor: p.route.name === 'Profile' ? '#bbf' : '#fff' }
          :
          { flex: 1, overflow:'hidden' }]} >

        {
          p.route.name === 'Profile' &&(
          p.tokenValue.fullname ?
          <Drawer name={'Profile'} title={'پروفایل'} group={drawer} bgcolor="#9f9fff" style={{overflow:'hidden'}}>
            <BottomTab name={'Profile'} title={'پروفایل'} group={bottom} bgcolor="#9f9fff" color='white' activeColor='#05f' style={{overflow:'hidden',boxShadow:'1px -2px 8px #1188', borderTopWidth:1, borderColor:'red'}} >
              {p.children}
            </BottomTab>
          </Drawer>:<View onLayout={()=>p.navigation.navigate('Login')} ></View>)
          ||
          p.route.name === 'Login' &&(
          !p.tokenValue.fullname ?
          <BottomTab name={'Login'} group={bottom} >
            <TopTab name={'Login'} group={topUser} >
              {p.children}
            </TopTab>
          </BottomTab>:<View onLayout={()=>p.navigation.navigate('Home')} ></View>)
          ||
          p.route.name === 'Register' &&(
          !p.tokenValue.fullname ?
          <BottomTab name={'Register'} group={bottom} >
            <TopTab name={'Register'} group={topUser} >
              {p.children}
            </TopTab>
          </BottomTab>:<View onLayout={()=>p.navigation.navigate('Home')} ></View>)
          ||
          p.route.name === 'Home' &&
          <BottomTab name={'Home'} group={bottom} bgcolor='#103' color='#fff' activeColor='#3bf' style={{boxShadow:'1px 1px 8px #a80'}} >
            {p.children}
          </BottomTab>
        ||
        p.children
        }
      </Animated.View>
      :
      <View flex={1} >
        {p.children}
      </View>
  )
}

export const header = () => {
  const navigation = useNavigation();
  return (
    <Pressable >
      <Text onPress={() => navigation.goBack()}
        style={{ fontSize: 32, marginTop: -5, paddingHorizontal: 5, paddingVertical: 2.5, flexGrow: 1 }}>
        {`»`}
      </Text>
    </Pressable>
  );
};
// getCurrentRoute
