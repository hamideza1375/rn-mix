import React, { useEffect } from "react";
import { Image, View, ScrollView, Text, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildFood from "./screens/food/ChildFood";
import SingleFood from "./screens/food/SingleFood";
import ForgetPass from "./screens/user/ForgetPass";
import ResetPass from "./screens/user/ResetPass";
import Payment from "./screens/user/Payment";
import Logout from "./screens/user/Logout";
import Login from "./screens/user/Login";
import Register from "./screens/user/Register";
import Location from "./screens/user/Location"
import Profile from "./screens/user/Profile"
import FinallFoodPayment from "./screens/food/FinallFoodPayment"
import AdminTitleAllFood from "./screens/admin/AdminTitleAllFood";
import AdminChildTable from "./screens/admin/AdminChildTable"
import EditTitleAllFood from './screens/admin/EditTitleAllFood';
import EditChildFood from './screens/admin/EditChildFood';
import CreateTitleAllFood from './screens/admin/CreateTitleAllFood';
import CreateChildFood from './screens/admin/CreateChildFood';
import ListAvailable from './screens/admin/ListAvailable';
import { contextStates, states } from "./utils/context/contexts";
import Address from "./screens/admin/Address";
import DeleteAllAddress from "./screens/admin/DeleteAllAddress";
import AddAdmin from "./screens/admin/AddAdmin";
import DeleteAdmin from "./screens/admin/DeleteAdmin";
import Notifee from './screens/admin/Notifee';
import ChangeAdmin from "./screens/admin/ChangeAdmin";
import { Div, H, Input, RowSpan } from "./Components/Html";
import Home from "./screens/food/Home"
import { Layout } from "./_other/Layout";
import _404 from "./_other/404"
import ToastProvider, { Toast } from "./utils/toast";
import { userState } from "./state/userState";
import { foodState, home } from "./state/foodState";
import { adminState } from "./state/adminState";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import VerifyPayment from "./screens/user/VerifyPayment";
import Icon from "react-native-vector-icons/dist/FontAwesome";

const Tab = createNativeStackNavigator()
const Food = () => {
  const navigation = useNavigation()

  const allState = states()
  const toast = new Toast(allState)
  const p = { ...allState, toast }
  home(p)
  const ChangeStyle = (p.width > p.height) ? { marginBottom: 10, flex: 1 } : { flex: 1 }
  const _food = ({ navigation, route }) => new foodState({ ...p, navigation, route })
  const _user = ({ navigation, route }) => new userState({ ...p, navigation, route })
  const _admin = ({ navigation, route }) => new adminState({ ...p, navigation, route })
  const reducer = (props) => ({ _food: _food(props), _user: _user(props), _admin: _admin(props), _scrollView: (p) => <ScrollView style={[ChangeStyle, p.style]} {...p} contentContainerStyle={[{ flexGrow: 1, width: '100%', height: '100%' }, p.contentContainerStyle]} >{p.children}</ScrollView> })

  let imageStyle
  if (allState.width <= 650) imageStyle = { width: allState.width, height: allState.width }
  if (allState.width > 650) imageStyle = { width: 600, height: 600 }


  useEffect(() => {
    // var perfEntries = performance.getEntriesByType("navigation")
    // console.log(perfEntries);
    // if (window.performance && performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //   console.info( "This page is reloaded" );
    // } 
    // if (allState.allprice) 
    // const beforeUnloadListener = (event) => {
    //   event.preventDefault();
    //   return event.returnValue = "Are you sure you want to exit?";
    // };
    // const beforeUnloadListener = (event) => {
    //   event.preventDefault();
    //   return event.returnValue = "Are you sure you want to exit?";
    // };
    // if (p.allprice !== 0) {
    //   addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    // } 
    // if (p.allprice === 0) {
    //   removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    // }
  }, [])


  return (
    p.splash ?
      <Image source={require('./assets/images/logo.jpg')} style={[{ margin: 'auto', borderRadius: 5 }, imageStyle]} />
      :
      <contextStates.Provider value={p}>
        <H ref={(e)=>allState.set$(e)} id={'s'} />
        <ToastProvider {...p} />
        <Tab.Navigator screenOptions={{ headerLeft: () => <Icon style={{ fontSize: 28, paddingRight: 15, color: '#777' }} name='home' onPress={() => navigation.navigate('Home')} />, headerTitleAlign: 'center', headerTitleStyle: { color: 'transparent' } }} >

          <Tab.Group >
            <Tab.Screen name="Home" options={{ title: 'خانه', headerStyle: { backgroundColor: '#103' }, headerLeft: p.tokenValue.fullname !== '' ? () => <></> : () => <Pressable style={{ width: 80, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#444', borderRadius: 4, shadowRadius: 9, shadowOpacity: .4, shadowColor: 'blue' }} onPress={() => navigation.navigate('Register')} ><Text style={{ color: '#fff', fontSize: 16 }}>ورود/ثبت نام</Text></Pressable> }} children={(props) => <Layout {...props}  {...p} ><Home {...props} {...p}  {...reducer(props)} /></Layout>} />
            <Tab.Screen name="ChildFood" options={({ route }) => ({ title: route.params.title, headerShown: false })} children={(props) => <Layout {...props} {...p} ><ChildFood {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="SingleFood" options={({ route }) => ({ title: route.params.title })} children={(props) => <Layout {...props} {...p} ><SingleFood {...props} {...p} {...reducer(props)} /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: false }} >
            <Tab.Screen name="Register" options={{ title: 'ثبت نام' }} children={(props) => <Layout _key='120' {...props}  {...p} ><Register {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="Login" options={{ title: 'ورود' }} children={(props) => <Layout _key='120' {...props} {...p} ><Login {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="ForgetPass" options={{ title: 'فراموشی رمز عبور' }} children={(props) => <Layout {...props}  {...p} ><ForgetPass {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="ResetPass" options={{ title: 'عوض کردن رمز عبور' }} children={(props) => <Layout {...props}  {...p} ><ResetPass {...props} {...p} {...reducer(props)} /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: false }} >
            <Tab.Screen name="Profile" options={{ title: 'پروفایل' }} children={(props) => <Layout _key='100' {...props}  {...p} ><Profile {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="FinallFoodPayment" options={{ title: 'سبد خرید' }} children={(props) => <Layout {...props}  {...p} ><FinallFoodPayment {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="Logout" options={{ title: 'خروج' }} children={(props) => <Layout {...props}  {...p} ><Logout {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="Payment" options={{ title: 'پرداخت' }} children={(props) => <Layout {...props}  {...p} ><Payment {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="VerifyPayment" children={(props) => <Layout {...props}  {...p} ><VerifyPayment {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="ListAvailable" options={{ title: 'لیست غذا ناموجود' }} children={(props) => <Layout {...props}  {...p} ><ListAvailable {...props} {...p} {...reducer(props)} /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerLeft:()=><></>}}>
            <Tab.Screen name="AdminTitleAllFood" options={{ title: 'پنل ادمین' , headerShown:false}} children={(props) => <Layout {...props}  {...p} ><AdminTitleAllFood {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="AdminChildTable" options={({ route }) => ({ title: route.params.title, header: (props) =><Div bgcolor='#fff' style={{shadowRadius:7, shadowOpacity:.2}} mb={5} > <Input alignSelf='center' mt={5} mb={2} w='97%' placeholderColor='red' iconColor='#777' border={[1, '#aaa']} icon='search' value={p.textSearch} onChangeText={(text) => { _food(props).sercher(text); p.settextSearch(text) }} placeholder="جستجو" /></Div> })} children={(props) => <Layout {...props}  {...p} ><AdminChildTable {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="EditTitleAllFood" options={({ route }) => ({ title: route.params.title })} children={(props) => <Layout {...props}  {...p} ><EditTitleAllFood {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="EditChildFood" options={({ route }) => ({ title: route.params.title })} children={(props) => <Layout {...props}  {...p} ><EditChildFood {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="CreateTitleAllFood" options={({ route }) => ({ title: 'ساخت دسته ی اغذیه' })} children={(props) => <Layout {...props}  {...p} ><CreateTitleAllFood {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="CreateChildFood" options={({ route }) => ({ title: `ساخت دسته برای ${route.params.title}` })} children={(props) => <Layout {...props}  {...p} ><CreateChildFood {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="AddAdmin" options={{ title: 'اضافه کردن ادمین' }} children={(props) => <Layout {...props}  {...p} ><AddAdmin {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="Notifee" options={{ title: 'ارسال نوتیفیکیشن' }} children={(props) => <Layout {...props}  {...p} ><Notifee {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="ChangeAdmin" options={{ title: 'تعویض ادمین' }} children={(props) => <Layout {...props}  {...p} ><ChangeAdmin {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="Address" options={{ title: 'آدرس' }} children={(props) => <Layout {...props}  {...p} ><Address {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="DeleteAdmin" options={{ title: 'حذف ادمین' }} children={(props) => <Layout {...props}  {...p} ><DeleteAdmin {...props} {...p} {...reducer(props)} /></Layout>} />
            <Tab.Screen name="DeleteAllAddress" options={{ title: 'حذف آدرس ها', headerShown: true, header: (props) => <RowSpan flexDirection={'row-reverse'} ><Input border={[1, '#888']} h={42} m={'auto'} mv={10} w={'90%'} alignSelf='center' value={p.textSearch} onChangeText={(text) => { p.settextSearch(text); const fd = p._address.filter(f => f.fullname.includes(text) || f.phone == text); p.setallAddress(fd) }} p="جستجو" icon={'search'} /></RowSpan> }} children={(props) => <Layout {...props}  {...p} ><DeleteAllAddress {...props} {...p} {...reducer(props)} /></Layout>} />
          </Tab.Group>

          <Tab.Screen name="Location" options={{ title: 'نقشه', headerShown: false }} children={(props) => <Layout {...props}  {...p} ><Location {...props} {...p} {...reducer(props)} /></Layout>} />
          <Tab.Screen name="NotFound" options={{ title: '404', headerShown: false }} children={(props) => <Layout {...props}  {...p} ><_404 {...props} {...p} {...reducer(props)} /></Layout>} />

        </Tab.Navigator>
      </contextStates.Provider>
  )
}

const linking = {
  prefixes: ['localhost:19006://', 'http://localhost:19006'],
  config: {
    screens: {
      Home: '/Home',
      ChildFood: 'ChildFood/:id',
      SingleFood: 'SingleFood/:id',
      Register: 'Register',
      Login: 'Login',
      ForgetPass: 'ForgetPass',
      ResetPass: 'ResetPass',
      Profile: 'Profile',
      FinallFoodPayment: 'FinallFoodPayment',
      Logout: 'Logout',
      Payment: 'Payment',
      VerifyPayment: 'VerifyPayment',
      ListAvailable: 'ListAvailable',
      AdminTitleAllFood: 'AdminTitleAllFood',
      AdminChildTable: 'AdminChildTable/:id',
      EditTitleAllFood: 'EditTitleAllFood:/id',
      EditChildFood: 'EditChildFood/:id',
      CreateTitleAllFood: 'CreateTitleAllFood/:id',
      CreateChildFood: 'CreateChildFood/:id',
      AddAdmin: 'AddAdmin',
      Notifee: 'Notifee',
      ChangeAdmin: 'ChangeAdmin',
      Address: 'Address',
      DeleteAdmin: 'DeleteAdmin',
      DeleteAllAddress: 'DeleteAllAddress',
      Location: 'Location',
      NotFound: '*'
    },
  },
};

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <View style={{ minHeight: '100vh' }} dir='rtl' >
        <Food />
      </View>
    </NavigationContainer>
  )
}
export default App;



