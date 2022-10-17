import React, { useState, useEffect, useRef, useCallback } from 'react'
import { KeyboardAvoidingView, Pressable, View, Text, TextInput, Image, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native'
import { Input, Button, CheckBox } from './Html'
import Swiper from './Swiper'
import yub from '../utils/yub'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/AntDesign';
const newObj = new Proxy({}, yub);
import { useFocusEffect } from '@react-navigation/native';

// textContentType="oneTimeCode" and keyboardType="numeric"

{/* <input
  type="text"
  name="token"
  inputmode="numeric"
  pattern="[0-9]"
  autocomplete="one-time-code"
/> */}

let interval
const Form = ({ btn=true,contentContainerStyle,overflow,mAutoFocus,mt,bgcolor='#f0f0f0',f, e, p, cp, m, ch, c, t, pr, im, i, edit, s, ph,$code,code,setcode,
  title, settitle, price, setprice, phone, setphone,
  imageUrl, setImageUrl, info, setInfo
  , style, fullname, setfullname,
  email, setemail, password, setPassword,
  confirmPassword, setconfirmPassword, onPress, message,
  setmessage, children, captcha, setcaptcha, host, checkText, setremember,remember,
  star1, setstar1, star2, setstar2, star3, setstar3, star4, setstar4, star5, setstar5, allstar,
  setallstar,
  sizeY = 1, top = 25,
  setorientation, setwidth, setheight,
  fIconLeft, fIconRight, eIconLeft, eIconRight, pIconLeft, pIconRight, cpIconLeft, cpIconRight,
  tIconLeft, tIconRight, prIconLeft, prIconRight, iIconLeft, iIconRight, imIconLeft, imIconRight, phIconLeft, phIconRight,
  input, setinput, _input
}) => {


  useFocusEffect(useCallback(()=>{
  return()=>(interval) && clearInterval(interval)
},[]))

  useEffect(() => {
    setallstar && setallstar(() => {
      let a = ''
      switch (true) {
        case star5:
          a = 5
          break;
        case star4:
          a = 4
          break;
        case star3:
          a = 3
          break;
        case star2:
          a = 2
          break;
        case star1:
          a = 1
          break;
        default:
          a = 0
          break;
      }
      return a
    })

  }, [star1, star2, star3, star4, star5])



  Dimensions.addEventListener('change', ({ window: { width, height } }) => {
    if (width < height) { setorientation("PORTRAIT"); setwidth(width); setheight(height) }
    else { setorientation("LANDSCAPE"); setwidth(width); setheight(height) }
  })



  const [secure, setSecure] = useState(true)
  const [secure2, setSecure2] = useState(true)

  const [show, setshow] = useState(ch && !checkText?false:true)
  const [rand, setRand] = useState(parseInt(Math.random() * 9000 + 1000));
  const [show2, setShow2] = useState(false);

  const [changeRand, setchangeRand] = useState(false);

  const [changeremember, setchangeremember] = useState(true);

  const refInput = React.useRef()


  useFocusEffect(useCallback(() => {
    console.log(9)
    changeRand && setRand(parseInt(Math.random() * 9000 + 1000))
  }, [show2]))




  const [_fullname, set_Fullname] = useState()
  const [_email, set_Email] = useState()
  const [_password, set_Password] = useState()
  const [_confirmPassword, set_ConfirmPassword] = useState()

  const [_title, set_Title] = useState()
  const [_price, set_Price] = useState()
  const [_imageUrl, set_ImageUrl] = useState()
  const [_info, set_Info] = useState()

  const [_message, set_Message] = useState()
  const [_checkbox, set_Checkbox] = useState()

  const [_captcha, set_Captcha] = useState()
  const [_allstar, set_Allstar] = useState()
  const [_phone, set_Phone] = useState()

  const [_googleCaptcha, set_googleCaptcha] = useState(false)




  newObj.phone = phone;
  newObj.fullname = fullname
  newObj.email = email;
  newObj.password = password;
  newObj.confirmPassword = confirmPassword;

  newObj.title = title
  newObj.price = price;
  newObj.imageUrl = imageUrl;
  newObj.info = info;

  newObj.message = message;

  newObj.allstar = allstar;


  var pon = ph ? newObj.phone === phone : true
  var flm = f ? newObj.fullname === fullname : true
  var eml = e ? newObj.email === email : true
  var psd = p ? newObj.password === password : true
  var cfpsd = cp ? newObj.confirmPassword === confirmPassword : true
  var msg = m ? newObj.message === message : true
  var cap = c ? (rand == captcha) ? true : false : true

  var titl = t ? newObj.title === title : true
  var prc = pr ? newObj.price === price : true
  var img = im ? !edit ? newObj.imageUrl === imageUrl : true : true
  var inf = i ? newObj.info === info : true



  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnimPh = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;

  const fadeAnim5 = useRef(new Animated.Value(0)).current;
  const fadeAnim6 = useRef(new Animated.Value(0)).current;
  const fadeAnim7 = useRef(new Animated.Value(0)).current;
  const fadeAnim8 = useRef(new Animated.Value(0)).current;

  const fadeOut = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt = fadeAnim.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })


  const fadeOut2 = () => {
    Animated.sequence([
      Animated.timing(fadeAnim2, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim2, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt2 = fadeAnim2.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })



  const fadeOutPh = () => {
    Animated.sequence([
      Animated.timing(fadeAnimPh, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnimPh, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnimPh, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnimPh, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPltPh = fadeAnimPh.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })



  const fadeOut3 = () => {
    Animated.sequence([
      Animated.timing(fadeAnim3, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim3, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim3, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim3, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt3 = fadeAnim3.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })


  const fadeOut4 = () => {
    Animated.sequence([
      Animated.timing(fadeAnim4, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim4, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim4, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim4, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt4 = fadeAnim4.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })










  const fadeOut5 = () => {
    Animated.sequence([
      Animated.timing(fadeAnim5, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim5, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim5, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim5, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt5 = fadeAnim5.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })


  const fadeOut6 = () => {
    Animated.sequence([
      Animated.timing(fadeAnim6, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim6, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim6, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim6, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt6 = fadeAnim6.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })


  const fadeOut7 = () => {
    Animated.sequence([
      Animated.timing(fadeAnim7, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim7, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim7, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim7, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt7 = fadeAnim7.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })


  const fadeOut8 = () => {
    Animated.sequence([
      Animated.timing(fadeAnim8, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim8, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim8, {
        toValue: 5,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(fadeAnim8, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false
      })
    ]).start();
  };
  const iterPlt8 = fadeAnim8.interpolate({
    inputRange: [0, 5],
    outputRange: ["#f22", "black"]
  })



  return (
    <ScrollView contentContainerStyle={[{height:'auto', overflow:!btn?'hidden':overflow},contentContainerStyle]}  style={{ backgroundColor: bgcolor,borderRadius:3,marginTop:mt, overflow:!btn?'hidden':overflow }} >

      <View style={[styles.viewContainer, { paddingTop: top }, style]} >

        <View style={[{ transform: [{ scaleY: sizeY }], paddingHorizontal: 20 }]}>



          {
            f &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Swiper
                  cansel={(fIconLeft || fIconRight) ? false : true}
                  style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={fIconLeft}
                  iconRight={fIconRight}
                >
                  <Text style={[styles.textinput, { marginTop: 5 }]} >نام</Text>
                  <Animated.View style={[styles.animatedBorder, _fullname && !flm && { borderWidth: 1.2, borderColor: iterPlt, transform: [{ translateX: fadeAnim }] }]} >
                    <Input
                      textContentType="username"
                      autoComplete="username"
                      icon="user"
                      p=" نام "
                      value={fullname}
                      onChangeText={(text) => setfullname(text)}
                      onBlur={() => { set_Fullname(true); !flm && fadeOut() }}
                      style={[styles.input]}
                    />
                  </Animated.View>
                  {_fullname && !flm && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.fullname}
                  </Text>
                  }
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView>
          }







          {e &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 },
              !eml && { transform: [{ translateX: fadeAnim2 }] }]} >
                <Swiper cansel={(eIconLeft || eIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={eIconLeft}
                  iconRight={eIconRight}>
                  <Text style={[styles.textinput, { marginTop: 5 }]} >ایمیل</Text>
                  <Animated.View style={[styles.animatedBorder, _email && !eml &&
                    { borderWidth: 1.2, borderColor: iterPlt2 }]} >
                    <Input p=" ایمیل "
                      textContentType="emailAddress"
                      autoComplete="email"
                      icon="envelope"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={(text) => setemail(text)}
                      onBlur={() => { set_Email(true); !eml && fadeOut2() }}
                      style={styles.input}
                    />
                  </Animated.View>
                  {_email && !eml && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.email}
                  </Text>}
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView>
          }






          {ph &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 },
              !pon && { transform: [{ translateX: fadeAnimPh }] }]} >
                <Swiper cansel={(phIconLeft || phIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={phIconLeft}
                  iconRight={phIconRight}>
                  <Text style={[styles.textinput, { marginTop: 5 }]} >شماره تلفن</Text>
                  <Animated.View style={[styles.animatedBorder, _phone && !pon &&
                    { borderWidth: 1.2, borderColor: iterPlt }]} >
                    <Input p=" شماره تلفن "
                      textContentType="telephoneNumber"
                      autoComplete="tel"
                      icon="phone"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={(text) => setphone(text)}
                      onBlur={() => { set_Phone(true); !pon && fadeOutPh() }}
                      style={styles.input}
                    />
                  </Animated.View>
                  {_phone && !pon && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.phone}
                  </Text>}
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView>
          }










          {p &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Swiper cansel={(pIconLeft || pIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={pIconLeft}
                  iconRight={pIconRight}
                >
                  <Text style={[styles.textinput, { marginTop: 5 }]} >رمز عبور</Text>
                  <Animated.View style={[styles.animatedBorder, _password && !psd &&
                  {
                    borderWidth: 1.2, borderColor: iterPlt3, transform: [{ translateX: fadeAnim3 }]
                  }]} >
                    <Input p=" رمز عبور "
                      textContentType="password"
                      autoComplete="password"
                      iconPress={() => { setSecure(!secure); }}
                      icon={!secure ? "eye" : "eye-slash"}
                      secureTextEntry={secure}
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      onBlur={() => { set_Password(true); !psd && fadeOut3() }}
                      style={styles.input}
                    />
                  </Animated.View>
                  {_password && !psd && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.password}
                  </Text>}
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView>
          }





          {cp &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Swiper cansel={(cpIconLeft || cpIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={cpIconLeft}
                  iconRight={cpIconRight}
                >
                  <Text style={[styles.textinput, { marginTop: 5 }]} >تکرار رمز عبور</Text>
                  <Animated.View style={[styles.animatedBorder,
                  _confirmPassword && !cfpsd &&
                  { borderWidth: 1.2, borderColor: iterPlt4, transform: [{ translateX: fadeAnim4 }] }]} >
                    <Input
                      textContentType="password"
                      autoComplete="password"
                      iconPress={() => { setSecure2(!secure2); }}
                      icon={!secure2 ? "eye" : "eye-slash"}
                      secureTextEntry={secure2}
                      value={confirmPassword}
                      onChangeText={(text) => setconfirmPassword(text)}
                      p=" تکرار رمز عبور "
                      onBlur={() => { set_ConfirmPassword(true); !cfpsd && fadeOut4() }}
                      style={styles.input}
                    />
                  </Animated.View>
                  {_confirmPassword && !cfpsd && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.confirmPassword}
                  </Text>}
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView >
          }




          {t &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Swiper cansel={(tIconLeft || tIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={tIconLeft}
                  iconRight={tIconRight}
                >
                  <Text style={[styles.textinput, { marginTop: 5 }]} >عنوان</Text>
                  <Animated.View style={[
                    styles.animatedBorder
                    , _title && !titl &&
                    {
                      borderWidth: 1.2, borderColor: iterPlt5,
                      transform: [{ translateX: fadeAnim5 }]
                    }]} >
                    <Input
                      icon="header"
                      p=" عنوان "
                      value={title}
                      onChangeText={(text) => settitle(text)}
                      onBlur={() => { set_Title(true); !titl && fadeOut5() }}
                      style={[styles.input]}
                    />
                  </Animated.View>
                  {_title && !titl && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.title}
                  </Text>
                  }
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView>
          }





          {pr &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 },
              !prc && { transform: [{ translateX: fadeAnim6 }] }]} >
                <Swiper cansel={(prIconLeft || prIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={prIconLeft}
                  iconRight={prIconRight}>
                  <Text style={[styles.textinput, { marginTop: 5 }]} >قیمت</Text>
                  <Animated.View style={[styles.animatedBorder,
                  (_price && !prc) &&
                  { borderWidth: 1.2, borderColor: iterPlt6 }]} >
                    <Input p=" قیمت "
                      icon="dollar"
                      keyboardType="numeric"
                      value={price}
                      onChangeText={(text) => setprice(text)}
                      onBlur={() => { set_Price(true); !prc && fadeOut6() }}
                      style={styles.input}
                    />
                  </Animated.View>
                  {_price && !prc && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.price}
                  </Text>}
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView>
          }






          {im &&
            <View style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Swiper cansel={(imIconLeft || imIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={imIconLeft}
                  iconRight={imIconRight}
                >
                  <Text style={[styles.textinput, { marginTop: 5 }]} >گالری</Text>
                  <Animated.View style={[styles.animatedBorder,
                  _imageUrl && !img &&
                  {
                    borderWidth: 1.2, borderColor: iterPlt7,
                    transform: [{ translateX: fadeAnim7 }]
                  }]} >
                    <View style={{border:'1px solid #111', marginBottom: 5,
                      height: 50,
                      backgroundColor:'#fff',
                      justifyContent:'center',
                      minWidth: '90%',borderRadius:5, boxShadow:'1px 1px 4px #0007'}} >
                  <View style={{position:'absolute', height:'100%', width:'14.8%',maxWidth:80, left:0,borderRightWidth:.8,borderColor:'#111',alignItems:'center', justifyContent:'center'}} >
                   <Icon style={{}} name={'image'} size={22} color={"#666"} />
                   </View>
                   <Text style={{width:'85%',marginTop:15,paddingHorizontal:8, color:'#666'}} >{imageUrl?.name?imageUrl.name:'انتخواب عکس از گالری'}</Text>
                    <input
                    type={'file'}
                    accept="image/*"
                    // accept="audio/*,video/*,image/*"
                    placeholder=" انتخاب از گالری "
                    onChange={(event)=>{setImageUrl(event.target.files[0])}}
                    style={{opacity:0, width:'100%',height:'100%'}}
                    />
                    </View>
                  </Animated.View>
                  {_imageUrl && !img && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.imageUrl}
                  </Text>}
                </Swiper>
              </Animated.View>
            </View>
          }






          {i &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <Animated.View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Swiper cansel={(iIconLeft || iIconRight) ? false : true} style={{ height: '100%', marginBottom: 20, paddingBottom: 20 }}
                  styleRightIcon={{ top: 37 }}
                  styleLeftIcon={{ top: 37 }}
                  iconLeft={iIconLeft}
                  iconRight={iIconRight}
                >
                  <Text style={[styles.textinput, { marginTop: 5 }]} >توضیحات</Text>
                  <Animated.View style={[styles.animatedBorder,
                  _info && !inf &&
                  {
                    borderWidth: 1.2, borderColor: iterPlt8
                    , transform: [{ translateX: fadeAnim8 }]
                  }]} >
                    <Input
                      icon={'info'}
                      value={info}
                      onChangeText={(text) => setInfo(text)}
                      p=" توضیحات "
                      onBlur={() => { set_Info(true); !inf && fadeOut8() }}
                      style={styles.input}
                    />
                  </Animated.View>
                  {_info && !inf && <Text style={[styles.textinput, { color: 'red' }]} >
                    {newObj.info}
                  </Text>}
                </Swiper>
              </Animated.View>
            </KeyboardAvoidingView>
          }



          {m &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1, marginBottom: 20 }}>
              <View style={[styles.viewInput, { flexGrow: 3, height:120,minHeight: 120, marginBottom: 20, marginTop: 1 }]} >
                <Text style={[styles.textinput, { marginTop: 0 }]}>پیام</Text>
                <View style={[{ height: '80.7%', marginBottom: 5 },
                _message && !msg && { borderWidth: 1.2, borderColor: '#f22', borderRadius: 5 }]} >
                  <Input 
                    autoFocus={mAutoFocus}
                    multiline
                    value={message}
                    onChangeText={(text) => setmessage(text)}
                    p="پیام"
                    onBlur={() => set_Message(true)}
                    style={[styles.input, { height: 100}]}
                    textStyle={{maxWidth:'100%', width:'100%'}}
                  />
                </View>
                {_message && !msg && <Text style={[styles.textinput, { color: 'red' }]} >
                  {newObj.message}
                </Text>}
              </View>
            </KeyboardAvoidingView>
          }




          {
            _input &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Input
                  textContentType="telephoneNumber"
                  autoComplete="tel"
                  icon="phone"
                  keyboardType="phone-pad"
                  value={input}
                  p={'ادمین جدید'}
                  onChangeText={(text) => setinput(text)}
                  style={[styles.input,{paddingRight:3}]}
                />
              </View>
            </KeyboardAvoidingView>

          }






        {
            $code &&
            <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
              <View style={[styles.viewInput, { minHeight: 90 }, { marginBottom: 5 }]} >
                <Input
                  mc_icon="cellphone-message"
                  iconSize={30}
                  keyboardType="phone-pad"
                  value={code}
                  p={'کد ورود'}
                  onChangeText={(text) => setcode(text)}
                  style={[styles.input,{paddingRight:3}]}
                />
              </View>
            </KeyboardAvoidingView>
          }






          {ch &&
            <View behavior={"height"} style={{ flex: .5, justifyContent: 'center' }}>
              <View style={{ marginVertical: 10 }} >
                <View style={[styles.viewCheckbox, { flexGrow: .4, maxHeight: 20 }]}>
                  <CheckBox show={!checkText?show:changeremember} setshow={!checkText?setshow:setchangeremember} />
                  <Text onPress={(e) => console.log(e.nativeEvent.text)} style={{ marginHorizontal: 11 }} >{checkText ? checkText : "موافقت با قوانین"}</Text>
                </View>
                {_checkbox && show == false && <Text style={{ color: 'red', alignSelf: 'flex-start' }} >پرکردن فیلد الزامی هست</Text>}
              </View>
            </View>
          }


          {c &&
            <>
              <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
                <View style={[styles.viewCaptcha]}>

                  <View style={styles.containImageCaptcha}>
                    <Image source={{ uri: `${host}/captcha.png/${rand}` }} style={styles.imageCaptcha} />
                  </View>
                  <Icon name="refresh" color="#66bbff" size={22}
                    style={styles.iconCaptcha}
                    onPressIn={() => setchangeRand(true)}
                    onPress={() => {
                      setchangeRand(true)
                      setShow2(!show2)
                      refInput.current && refInput.current.setNativeProps({ text: '' })
                    }} />
                  <TextInput
                    ref={refInput}
                    keyboardType="numeric"
                    placeholder="کد امنیتی" style={[styles.TextInput, { borderColor: '#666' }, rand != captcha && _captcha && { borderColor: '#a22' }]}
                    onChangeText={text => setcaptcha(text)} />
                </View>
                {rand != captcha && _captcha &&
                  <Text style={{ color: 'red', width: captcha ? 280 : 260 }} >
                    {captcha !== true ?
                      " کد وارد شده اشتباه هست"
                      :
                      "لطفا کادر را پر کنید"
                    }
                  </Text>}
              </KeyboardAvoidingView>
            </>
          }




          {children &&
            <View behavior={"height"} style={{ flex: 1 }}>

              <View style={[styles.viewChildren, { flexGrow: .4 }]}>
                <Text onPress={(e) => console.log(e.nativeEvent.text)}
                  style={{ color: '#0cf' }} >{children}</Text>
              </View>
            </View>
          }




          {s &&
            <View behavior={"height"} style={{ flex: 1 }}>
              <View style={{ minHeight: 42, maxHeight: 45, flexGrow: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, marginTop: 20 }}>
                <View style={{ flexGrow: .5, minHeight: 40, flexDirection: 'row-reverse', alignItems: 'center' }} >

                  {!star1 ?
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => setstar1(true)}>
                      <Icon name='star-o' size={26} color='orange' />
                    </Pressable>
                    :
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar1(false); setstar2(false); setstar3(false); setstar4(false); setstar5(false) }}>
                      <Icon name='star' size={26} color='orange' />
                    </Pressable>
                  }

                  {!star2 ?
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar1(true); setstar2(true); }}>
                      <Icon name='star-o' size={26} color='orange' />
                    </Pressable>
                    :
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar2(false); setstar3(false); setstar4(false); setstar5(false) }}>
                      <Icon name='star' size={26} color='orange' />
                    </Pressable>
                  }

                  {!star3 ?
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar1(true); setstar2(true); setstar3(true); }}>
                      <Icon name='star-o' size={26} color='orange' />
                    </Pressable>
                    :
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar5(false); setstar4(false); setstar3(false); }}>
                      <Icon name='star' size={26} color='orange' />
                    </Pressable>
                  }

                  {!star4 ?
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar1(true); setstar2(true); setstar3(true); setstar4(true); }}>
                      <Icon name='star-o' size={26} color='orange' />
                    </Pressable>
                    :
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar4(false); setstar5(false); }}>
                      <Icon name='star' size={26} color='orange' />
                    </Pressable>
                  }

                  {!star5 ?
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar1(true); setstar2(true); setstar3(true); setstar4(true); setstar5(true) }}>
                      <Icon name='star-o' size={26} color='orange' />
                    </Pressable>
                    :
                    <Pressable style={{ height: 40, justifyContent: 'center', marginRight: 7 }}
                      onPress={() => { setstar5(false) }}>
                      <Icon name='star' size={26} color='orange' />
                    </Pressable>
                  }




                </View>


                {_allstar && newObj.allstar != allstar &&
                  <View style={{ width: '100%', alignItems: 'center', height: 'auto', marginTop: 5 }} >
                    <Text style={[{ color: 'red' }]} >
                      {newObj.allstar}
                    </Text>
                  </View>
                }



              </View>


            </View>
          }









          <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>

          {btn &&  <Button
              onPressIn={() => {
                setremember(changeremember ? (60000 * 60 * 24 * 365) : ('24h'))
                set_Fullname(true);
                set_Email(true);
                set_Password(true);
                set_ConfirmPassword(true);
                set_Message(true);
                set_Checkbox(checkText?false:true);
                set_Captcha(true)
                set_Title(true)
                set_Price(true)
                set_ImageUrl(true)
                set_Info(true)
                set_Allstar(true)
                set_googleCaptcha(true)
                set_Phone(true)
                
              }}
              onPress={()=>{
              if (flm && eml && psd && cfpsd && msg && cap && show && titl && prc && img && inf && pon && star1) {
                onPress()
                interval = setTimeout(() => {
                setRand(parseInt(Math.random() * 9000 + 1000))
                refInput.current && refInput.current.setNativeProps({text: '' })
                setcaptcha(true)
                }, 1500) 
                
              }
                else {
                setRand(parseInt(Math.random() * 9000 + 1000))
                refInput.current && refInput.current.setNativeProps({text: '' })
              }
                  
          }}

            style={[styles.btn]} >
            click
          </Button>}
        </KeyboardAvoidingView>



      </View>
    </View>
    </ScrollView >
  )

}

export default Form
const styles = StyleSheet.create({
  closeRecaptcha: {
    fontSize: 31,
    elevation: 1,
    shadowColor: "#f00",
    shadowOpacity: 4,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    color: 'red',
    opacity: .8
  },

  checkboxGoggleRecaptcha: {
    transform: [{ scale: 2 }],
    borderColor: '#aaa',
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: .2,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 }
  },
  googleRecaptcha: {
    transform: [{ scale: .85 }],
    marginBottom: 17,
    marginTop: 15,
    flexGrow: 1.5,
    height: 105,
    maxHeight: 115,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    width: 111,
    borderRadius: 5,
    borderColor: '#ccc',
    alignSelf: 'center',
    // marginVertical: 22,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: .5,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 2
    }
  },
  animatedBorder: {
    height: 53,
    borderRadius: 5,
    marginBottom: 5,
  },
  containerScrollView: {
    height: '100%',
    minWidth: '100%',
    backgroundColor: '#f0f0f0',
    borderWidth: .3,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: .6,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2
    }
  },
  viewContainer: {
    minWidth: '100%',
    justifyContent: 'center',


  },
  contentContainerStyle: {
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderWidth: .3,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: .6,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2
    }
  },

  btn: {
    flexGrow: .5,
    marginTop: 30,
    marginBottom: 10,
    width: 200,
    alignSelf: 'center',
    minHeight: 40,
    maxHeight: 45,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: .6,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2
    }
  },
  viewChildren: {
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 22,
    marginLeft: 5,
    minHeight: 20,
    maxHeight: 24,

  },
  TextInput: {
    borderRadius: 2,
    textAlign: 'right',
    padding: 7,
    width: 85,
    height: 33,
    borderWidth: 1,
    backgroundColor: '#eee'
  },
  containImageCaptcha: {
    height:33,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: .5,
    shadowRadius: 3,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  imageCaptcha: {
    borderRadius: 2,
    padding: 5,
    backgroundColor: "#412",
    width: 105,
    height: 35,

  },
  iconCaptcha: {
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: .76,
    shadowRadius: 1,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  viewCaptcha: {

    flexDirection: "row",
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: "space-between",
    width: 260,
    marginTop: 25,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000b",
    shadowOpacity: .6,
    shadowRadius: 3,


  },
  viewCheckbox: {
    flexGrow: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: 150,
    minHeight: 18,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: .3,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 2
    }
  },

  messageInput: {
    minHeight: 100,
    shadowColor: "#000",
    shadowOpacity: .4,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  textinput: {
    height: 19,
    alignSelf: 'flex-start',
    fontSize: 11
  },
  input: {
    marginBottom: 5,
    minHeight: 50,
    minWidth: '90%',
    shadowColor: "#000",
    shadowOpacity: .4,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 2

    },
  },
  viewInput: {
    minWidth: "100%",
    marginBottom: 19,
    flexGrow: 1.5,
    minHeight: 80,
    maxHeight: 80,
  },

  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header22: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput22: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
})