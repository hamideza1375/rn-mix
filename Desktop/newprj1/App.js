import React from "react";
import { Image, View, ScrollView, Text, Pressable, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import ChildFood from "./src/screens/food/ChildFood";
import SingleFood from "./src/screens/food/SingleFood";
import ForgetPass from "./src/screens/user/ForgetPass";
import ResetPass from "./src/screens/user/ResetPass";
import Payment from "./src/screens/user/Payment";
import Logout from "./src/screens/user/Logout";
import Login from "./src/screens/user/Login";
import Register from "./src/screens/user/Register";
import Home from "./src/screens/food/Home"
import Location from "./src/screens/user/Location"
import Profile from "./src/screens/user/Profile"
import FinallFoodPayment from "./src/screens/food/FinallFoodPayment"
import AdminTitleAllFood from "./src/screens/admin/AdminTitleAllFood";
import AdminChildTable from "./src/screens/admin/AdminChildTable"
import EditTitleAllFood from './src/screens/admin/EditTitleAllFood';
import EditChildFood from './src/screens/admin/EditChildFood';
import CreateTitleAllFood from './src/screens/admin/CreateTitleAllFood';
import CreateChildFood from './src/screens/admin/CreateChildFood';
import ListAvailable from './src/screens/admin/ListAvailable';
import { contextStates, states } from "./src/utils/context/contexts";
import Address from "./src/screens/admin/Address";
import DeleteAllAddress from "./src/screens/admin/DeleteAllAddress";
import AddAdmin from "./src/screens/admin/AddAdmin";
import DeleteAdmin from "./src/screens/admin/DeleteAdmin";
import Notifee from './src/screens/admin/Notifee';
import ChangeAdmin from "./src/screens/admin/ChangeAdmin";
import { H1, Div, Input, Row } from "./src/Components/Html";
import { Init } from "./src/Components/Html";
import { Layout, header } from "./src/_other/Layout";
import _404 from "./src/_other/404"
import ToastProvider, { Toast } from "./src/utils/toast";
import { userState } from "./src/state/userState";
import { foodState, home } from "./src/state/foodState";
import { adminState } from "./src/state/adminState";
import { NavigationContainer } from '@react-navigation/native';
import {rtl} from "./src/_other/rtl"

rtl()


const Tab = createNativeStackNavigator()
const Food = () => {

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


  return (

    allState.splash ?
    <Div style={{width:'100%', height:'100%', justifyContent:'center',alignItems: 'center',}} >
     <Image source={require('./src/assets/images/logo.png')} style={[{ alignSelf:'center',alignItems: 'center',justifyContent:'center',width:'100%',height:'100%',  borderRadius: 5,marginTop:Platform.OS === 'ios' ?50:0 }, imageStyle]} />
    </Div>
    :
      <>
      {/* <contextStates.Provider value={p}> */}
        <Init ref={(e)=>allState.set$(e)} id={'s'} />
        <ToastProvider {...p} />
      {
     <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Group screenOptions={{ headerShown: true, headerLeft: Platform.OS === 'ios' ? header : null }}>
            <Tab.Screen name="Home" options={{ headerLeft: () => <></>, headerTitleStyle:{color:'#fff'},headerStyle:{backgroundColor:'#103'} }} children={(props) => <Layout {...props}  {...p} ><Home {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="ChildFood" children={(props) => <Layout {...props} {...p} ><ChildFood {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="SingleFood" children={(props) => <Layout {...props} {...p} ><SingleFood {...props} {...p} {...reducer(props)}/></Layout>} />
          </Tab.Group>
          <Tab.Group screenOptions={{ headerShown: false, headerLeft: header, headerBackVisible: false }} >
            <Tab.Screen name="Register" children={(props) => <Layout  _key='120' {...props}  {...p} ><Register {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="Login" children={(props) => <Layout _key='120' {...props} {...p} ><Login {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="ForgetPass" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><ForgetPass {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="ResetPass" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><ResetPass {...props} {...p} {...reducer(props)}/></Layout>} />
          </Tab.Group>
          <Tab.Group screenOptions={{ headerShown: false, headerLeft: Platform.OS === 'ios' ? header : null }} >
            <Tab.Screen name="Profile" children={(props) => <Layout _key='100' {...props}  {...p} ><Profile {...props} {...p} {...reducer(props)}/></Layout>} options={{ headerShown: false }} />
            <Tab.Screen name="FinallFoodPayment" options={{ headerShown: true, headerStyle:{backgroundColor:'#ff9911'}}} children={(props) => <Layout {...props}  {...p} ><FinallFoodPayment {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="Logout" children={(props) => <Layout {...props}  {...p} ><Logout {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="Payment" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><Payment {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="ListAvailable" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><ListAvailable {...props} {...p} {...reducer(props)}/></Layout>} />
          </Tab.Group>
          <Tab.Group screenOptions={{ headerShown: true, headerLeft: Platform.OS === 'ios' ? header : null }} >
            <Tab.Screen name="AdminTitleAllFood" children={(props) => <Layout {...props}  {...p} ><AdminTitleAllFood {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="AdminChildTable" children={(props) => <Layout {...props}  {...p} ><AdminChildTable {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="EditChildFood" children={(props) => <Layout {...props}  {...p} ><EditChildFood {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="EditTitleAllFood" children={(props) => <Layout {...props}  {...p} ><EditTitleAllFood {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="CreateTitleAllFood" children={(props) => <Layout {...props}  {...p} ><CreateTitleAllFood {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="CreateChildFood" children={(props) => <Layout {...props}  {...p} ><CreateChildFood {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="AddAdmin" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><AddAdmin {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="Notifee" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><Notifee {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="ChangeAdmin" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><ChangeAdmin {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="Address" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><Address {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="DeleteAdmin" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><DeleteAdmin {...props} {...p} {...reducer(props)}/></Layout>} />
            <Tab.Screen name="DeleteAllAddress" options={{ headerShown: true, header:(props)=><Row flexDirection={'row-reverse'} ><H1 onPress={()=>props.navigation.goBack()} h={42} pv={0} mt={Platform.OS === 'ios'? 35:-3} fontSize={40} >«</H1><Input h={42} mb={5} ml={'auto'} mt={Platform.OS === 'ios'? 45:5} w={'80%'} value={allState.textSearch} onChangeText={(text) => {allState.settextSearch(text);const fd = allState._address.filter(f => f.fullname.includes(text));allState.setallAddress(fd)}} p="جستجو غذا و نوشیدنی" icon={'search'} /></Row>}} children={(props) => <Layout {...props}  {...p} ><DeleteAllAddress {...props} {...p} {...reducer(props)}/></Layout>} />
          </Tab.Group>
          <Tab.Screen name="Location" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...p} ><Location {...props} {...p} {...reducer(props)}/></Layout>} />
          <Tab.Screen name="NotFound" options={{ title: '404', headerShown: false }} children={(props) => <Layout {...props}  {...p} ><_404 {...props} {...p} {...reducer(props)} /></Layout>} />
        </Tab.Navigator>

}


{/* </contextStates.Provider> */}
</>



  )
}




const App = () => {
  return (
    <NavigationContainer>
      <View flex={1}>
       <Food />
      </View>
    </NavigationContainer>
  )
}

export default App;



