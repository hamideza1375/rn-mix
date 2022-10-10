import { verifycodeRegister, sendcode, verifycode, loginUser, registerUser, forgetpassword, resetpassword } from "../services/userService"
import localStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useMemo } from "react";
import jwt_decode from "jwt-decode";
import { geocode, getallchildfood, getProfile, reverse, sendProfile } from "../services/foodService"
import { Keyboard } from "react-native";
import Alert from '../utils/alert'
let loginInterval = null

export function userState(p) {
  const navigation = useNavigation()
  const route = p.route
  let id = p.route?.params && p.route.params.id
  let id2 = p.route?.params && p.route.params.id2


  //Login
  this.sendLoginAction = async () => {
    loginInterval && clearInterval(loginInterval)
    let d = new Date()
    let locMinut = await localStorage.getItem('getMinutes')


    let svl = await localStorage.getItem("several")
    if ((locMinut - d.getMinutes()) <= 1) {
      await localStorage.removeItem("several")
      await localStorage.removeItem('getMinutes')
    }
    if (JSON.parse(svl) <= 5) {
      loginInterval = setTimeout(async () => {
        await localStorage.removeItem("several")
        await localStorage.removeItem('getMinutes')
      }, 120000);
    }
    if (JSON.parse(svl) < 5 || (locMinut - d.getMinutes() === 0)) {
      await localStorage.removeItem('getTime')
      await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
      localStorage.getItem("several").then((several) => {
        localStorage.setItem("several", JSON.stringify(JSON.parse(several) + 1)).then(() => { })
      })
      // send
      const { data } = await loginUser({ email: p.email, password: p.password, phone: p.phone, captcha: p.captcha, remember: p.remember }, navigation);
      await localStorage.setItem("token", data.token);
      await localStorage.setItem("exp", data.exp);
      const user = jwt_decode(data.token)
      p.settokenValue(user)
      p.settimeChange(5)
      // send


      p.route.params?.name !== 'ChildFood' ?
        navigation.navigate("Home") :
        p.route.params.price != 0 ?
          navigation.navigate("FinallFoodPayment") :
          navigation.navigate("Home")
    }
    else {
      let loc = await localStorage.getItem('getTime')
      if (loc === '' || loc === null || !loc) {
        loginInterval && clearInterval(loginInterval)
        await localStorage.setItem('getTime', 'true')
        await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
      }
      localStorage.getItem('getMinutes').then((locMinut) => {
        if (JSON.parse(svl) >= 5)
          alert(`تعداد دفعات وارد شده بیشتر از حد مجاز بود ${locMinut - d.getMinutes() > 0 ? locMinut - d.getMinutes() : 0} دقیقه دیگر دوباره امتحان کنید`)
      })
    }
  }


  this.mountLogin = () => {
    useFocusEffect(useCallback(() => (() => {
      p.setfullname('');
      p.setemail('');
      p.setphone('');
      p.setPassword('')
    }), []))
  }
  //Login




  // register
  this.registerSendAction = async () => {
    await registerUser({ phone: p.phone });
    p.setchangeRegister(!p.changeRegister)
  }


  this.registerSendCode = async () => {
    await verifycodeRegister({ code: p.code, fullname: p.fullname, email: p.email, phone: p.phone, password: p.password })
    p.navigation.navigate("Login")
    p.setchangeRegister(!p.changeRegister)
  }
  // register






  // Home
  this._token = async () => {
    if (p.navigation?.getState()?.index === 0 && route?.name === 'Home') {
      const exp = await localStorage.getItem("exp");
      if (exp && Number(exp) > Date.now() / 1000) return p.settoken(true)
      if (!exp) return p.settoken(false)
      if (exp && Number(exp) < Date.now() / 1000) {
        await localStorage.removeItem("token");
        await localStorage.removeItem("exp");
        return p.settoken(false)
      }
    }
  }
  // Home


  // profile
  this._tokenValue = () => {
    useFocusEffect(useCallback(() => {
      localStorage.getItem("token").then((token) => {
        if (token) {
        const user = jwt_decode(token)
        p.settokenValue(user)
      }})
    }, []))
  }


  this.imagePicker = async (uri) => {
    await sendProfile({ uri });
    p.setchange(!p.change)
  }



  this.profile = async () => {
    useFocusEffect(
      useCallback(() => {
        (async () => {
          let room = ['room5', 'room6']
          for (let i of room) {
            let loc = await localStorage.getItem(i)
            if (loc) { p.allRoom.set(i, JSON.parse(loc)); p.msgLength.set(i, JSON.parse(loc)); }
          }
        })()

        localStorage.getItem("token").then((token) => {
          const user = jwt_decode(token)
          token && p.settokenValue(user)
        })

      }, [])
    )

    useFocusEffect(
      useCallback(() => {
        (async () => {
          await getProfile().then(({ data }) => {
            data?.uri && p.setimageProfile(data.uri)
          })
        })()
      }, [p.change])
    )

    useMemo(() => {
      try {
        Keyboard.removeAllListeners('keyboardDidShow')
        Keyboard.removeAllListeners('keyboardDidHide')
      }
      catch (error) { }
    }, [])


  }

  // profile



  // forgetpassword
  this.forgetAction = async () => {
    await forgetpassword({ email: p.email })
  }

  this.setreplaceInput = async () => {
    useFocusEffect(useCallback(() => {
      return () => {
        p.setreplaceInput(false)
      }
    }, []))
  }
  // forgetpassword


  //sms
  this.smsAction = async () => {
    await sendcode({ phone: p.myPhone })
    p.setreplaceInput(true)
  }

  this.codeAction = async () => {
    const { data } = await verifycode({ code: p.myCode })
    navigation.navigate('ResetPass', { id: data })
  }

  //sms





  // location
  this.geoCodeAction = async () => {
    let { data } = await geocode({ loc: `سبزوار ${p.search1}` })
    let orgin = {
      latitude: data[0].latitude,
      longitude: data[0].longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008
    }
    // if(data[0] && data[0].latitude && data[0].zipcode === "96139-44591" || data[0].city === "دهستان قصبه شرقی" || data[0].city === "سبزوار" || data[0].city === "شهر سبزوار"){
    //  if(data[0].longitude > 57.65055116587766 && data[0].streetName !== "سبزوار - اسفراین" ) 
    // }
    if (data[0] && data[0].longitude &&
      data[0].longitude > 57.645 &&
      data[0].longitude < 57.711 &&
      data[0].latitude > 36.191 &&
      data[0].latitude < 36.239) p.setmarkers(orgin);
    p.setallItemLocation(data[0])

  }


  this.geoCodeAction2 = async (e) => {
    let orgin = {
      ...e.nativeEvent.coordinate,
    }
    p.setmarkers(orgin)
  }


  this.reversAction = async () => {
    useEffect(() => {
      (async () => {
        let { data } = await reverse(p.markers)
        let formattedAddress = data[0].formattedAddress
        let streetName = data[0].streetName

        p.setrevers({
          formattedAddress, streetName,
          origin: {
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }
        })
        p.setallItemLocation(data[0])
      })()
    }, [p.markers])



    useEffect(() => {
      if (p.allItemLocation && p.allItemLocation.longitude) {
        if (
          p.allItemLocation.longitude < 57.645 ||
          p.allItemLocation.longitude > 57.711 ||
          p.allItemLocation.latitude < 36.191 ||
          p.allItemLocation.latitude > 36.239 ||
          p.allItemLocation.streetName === "سبزوار - اسفراین"
        ) Toast('این منطقه از ارسال غذا پشتیبانی نمیکند')
      }
      if (p.route.params?.origin && p.tokenValue.isAdmin) p.setmarkers(p.route.params.origin["origin"])
    }, [p.allItemLocation])

  }



  // logout

  this.logout = async () => {
    useEffect(() => {
      (async () => {

        Alert.alert(
          "خارج میشوید؟",
          "",
          [{ text: 'no', onPress: () => { p.navigation.goBack() } },
          {
            text: 'yes', onPress: async () => {
              p.setnavigateProfile(false)
              p.setnavigateUser(false)
              p.settokenValue({})
              p.settoken(false)
              await localStorage.removeItem("token");
              await localStorage.removeItem("exp");

              for (let i of p.foods) {
                const { data } = await getallchildfood(i._id)
                for (let item of data.child) {
                  p.map.delete(item._id)
                  p.map.delete(item.title)
                }
              }
              p.map.delete('sum')
              p.map.delete('allprice')
              p.setallprice(0)

              p.navigation.navigate("Home")
            }
          }])
      })()

      return () => (
        p.setnavigateProfile(false),
        p.setnavigateUser(false)
      )
    }, []);
  }
  // logout



  // resetPass
  this.resetpassword = async () => {
    try {
      const { status } = await resetpassword(p.route.params.id, { password: p.password, confirmPassword: p.confirmPassword })
      if (status === 200) p.navigation.navigate('Login')
    } catch (err) { alert('خطایی رخ داد دوباره امتحان کنید'); }
  }
  // resetPass



}

