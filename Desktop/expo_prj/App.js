import React from "react";
import { Image, Platform, View } from "react-native";
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
import Address from "./screens/food/Address";
import DeleteAllAddress from "./screens/food/DeleteAllAddress";
import AddAdmin from "./screens/admin/AddAdmin";
import DeleteAdmin from "./screens/admin/DeleteAdmin";
import Notifee from './screens/admin/Notifee';
import ChangeAdmin from "./screens/admin/ChangeAdmin";
import { H1, Input, RowSpan } from "./Components/Html";
import Home from "./screens/food/Home"
import { Layout } from "./screens/_other/Layout";
import _404 from "./screens/_other/404"
import ToastProvider, { Toast } from "./utils/toast";
import { userState } from "./state/userState";
import { foodState, home } from "./state/foodState";
import { adminState } from "./state/adminState";
import { useNavigation } from "@react-navigation/native";
// import Chat from "./socket/Chat";
import { NavigationContainer } from '@react-navigation/native';

const Tab = createNativeStackNavigator()
const Food = () => {

  const allState = states()
  const toast = new Toast()
  const p = { ...allState, toast }
  home(p)
  const _food = ({navigation, route}) => new foodState({ ...p, navigation, route })
  const _user = ({navigation, route}) => new userState({ ...p, navigation, route })
  const _admin = ({navigation, route}) => new adminState({ ...p, navigation, route })
  const reducer = (props) => ({ _food: _food(props), _user: _user(props), _admin: _admin(props) })
  return (
    p.splash ?
      <Image source={require('./assets/images/logo.jpg')} style={{ width: '80%', height: '80%' , margin:'auto' , borderRadius:5}} />
      :
      <contextStates.Provider value={p}>
        <ToastProvider />
        <Tab.Navigator>

          <Tab.Group >
            <Tab.Screen name="Home" options={{headerStyle:{backgroundColor:'#103'},headerTitleAlign:'center',headerTitleStyle:{color:'#fff'}}} children={(props) => <Layout {...props}  {...p} ><Home {...props} {...p}  {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="ChildFood" children={(props) => <Layout {...props} {...p} ><ChildFood {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="SingleFood" children={(props) => <Layout {...props} {...p} ><SingleFood {...props} {...p} {...reducer(props)}  /></Layout>} />
          </Tab.Group>

          <Tab.Group >
            <Tab.Screen name="Register" children={(props) => <Layout _key='120' {...props}  {...p} ><Register {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="Login" children={(props) => <Layout _key='120' {...props} {...p} ><Login {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="ForgetPass" children={(props) => <Layout {...props}  {...p} ><ForgetPass {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="ResetPass" children={(props) => <Layout {...props}  {...p} ><ResetPass {...props} {...p} {...reducer(props)}  /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: false }} >
            <Tab.Screen name="Profile" children={(props) => <Layout _key='100' {...props}  {...p} ><Profile {...props} {...p} {...reducer(props)}  /></Layout>} options={{ headerShown: false }} />
            <Tab.Screen name="FinallFoodPayment" children={(props) => <Layout _key='100' {...props}  {...p} ><FinallFoodPayment {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="Logout" children={(props) => <Layout {...props}  {...p} ><Logout {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="Payment" children={(props) => <Layout {...props}  {...p} ><Payment {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="ListAvailable" children={(props) => <Layout {...props}  {...p} ><ListAvailable {...props} {...p} {...reducer(props)}  /></Layout>} />
          </Tab.Group>

          <Tab.Group>
            <Tab.Screen name="AdminTitleAllFood" children={(props) => <Layout {...props}  {...p} ><AdminTitleAllFood {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="AdminChildTable" children={(props) => <Layout {...props}  {...p} ><AdminChildTable {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="EditTitleAllFood" children={(props) => <Layout {...props}  {...p} ><EditTitleAllFood {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="EditChildFood" children={(props) => <Layout {...props}  {...p} ><EditChildFood {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="CreateTitleAllFood" children={(props) => <Layout {...props}  {...p} ><CreateTitleAllFood {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="CreateChildFood" children={(props) => <Layout {...props}  {...p} ><CreateChildFood {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="AddAdmin" children={(props) => <Layout {...props}  {...p} ><AddAdmin {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="Notifee" children={(props) => <Layout {...props}  {...p} ><Notifee {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="ChangeAdmin" children={(props) => <Layout {...props}  {...p} ><ChangeAdmin {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="Address" children={(props) => <Layout {...props}  {...p} ><Address {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="DeleteAdmin" children={(props) => <Layout {...props}  {...p} ><DeleteAdmin {...props} {...p} {...reducer(props)}  /></Layout>} />
            <Tab.Screen name="DeleteAllAddress" options={{ headerShown: true, header: (props) => <RowSpan flexDirection={'row-reverse'} ><H1 onPress={() => props.navigation.goBack()} h={42} pv={0} mt={Platform.OS === 'ios' ? 35 : -3} fontSize={40} >«</H1><Input h={42} mb={5} ml={'auto'} mt={Platform.OS === 'ios' ? 45 : 5} w={'80%'} value={p.textSearch} onChangeText={(text) => { p.settextSearch(text); const fd = p._address.filter(f => f.fullname.includes(text)); p.setallAddress(fd) }} p="جستجو غذا و نوشیدنی" icon={'search'} /></RowSpan> }} children={(props) => <Layout {...props}  {...p} ><DeleteAllAddress {...props} {...p} {...reducer(props)}  /></Layout>} />
          </Tab.Group>

          <Tab.Screen name="Location" children={(props) => <Layout {...props}  {...p} ><Location {...props} {...p} {...reducer(props)}  /></Layout>} />

          <Tab.Screen name="NotFound" options={{ headerShown: false }} children={(props) => <Layout {...props}  {...p} ><_404 {...props} {...p} {...reducer(props)}  /></Layout>} />

        </Tab.Navigator>
      </contextStates.Provider>
  )
}

const linking = {
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
       <View style={{flex:1}} dir='rtl' >
        <Food />
       </View>
    </NavigationContainer>
  )
}
export default App;



