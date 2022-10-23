import React from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { userState } from '../../state/userState';
import { foodState } from '../../state/foodState';
import styles from "./Food.scss"
import { localhost } from '../../utils/axios/axios'
import Loading from '../../Components/Loading'
import { Button } from '../../Components/Html';
import { context } from '../../utils/context/contexts';

export const _scrollView = (p) => {
  const ChangeStyle = (p.width > p.height) ? { marginBottom: 10, flex: 1 } : { flex: 1 }
  return <ScrollView style={[ChangeStyle]} {...p} contentContainerStyle={{ flexGrow: 1, minWidth: '100%' }} >{p.children}</ScrollView>
}

const Home = (p) => {
  // const p = context()

  const _food = new foodState(p)
  _food.getTitleFood(p.show)
  _food.backHandler()
  _food.setorientation()
  _user = new userState(p)
  _user._token()
  _user._tokenValue()

  return (
    <_scrollView >
      <View style={styles.container}>
        <Image source={require("../../assets/images/iconpiza.png")} style={styles.imageLogo} />
        <View style={styles.containerFood}>
          {!p.foods.length ?
            <Loading style={{ top: 70 }} animating={!p.foods.length ? true : false} />
            :
            p.tokenValue.isAdmin !== 'courier' ?
              p.foods.map((food) => (
                <TouchableOpacity key={food._id} style={[styles.pressOpacity, /* {display:tokenValue.isAdmin ? 'flex' : 'none' } */]}
                  onPress={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood) }} >
                  <View style={styles.containImageShadow}>
                    <Image source={{ uri: `${localhost}/upload/food/${food.imageUrl}` }} style={[styles.imageFood]} />
                  </View>
                  <Text style={[styles.textTitle]}>{food.title}</Text>
                </TouchableOpacity>
              ))
              :
              < >
                <View justifyContent='center' height={'55%'} width={100} alignSelf={'center'} >
                  <Button onPress={() => p.navigation.navigate("Address")} >address</Button>
                </View>
                <Text outline bgcolor='red' style={{ width: 100, alignSelf: 'center', marginTop: 'auto', textAlign: 'center', color: 'red', position: 'absolute', bottom: 15 }} onPress={() => p.navigation.navigate("Logout")}>logout</Text>
              </>
          }
        </View>
      </View>
    </_scrollView>
  )
}
export default Home