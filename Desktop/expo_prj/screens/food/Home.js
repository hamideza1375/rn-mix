import React from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import styles from "./styles/Food.js"
import { localhost } from '../../utils/axios/axios'
import Loading from '../../Components/Loading'
import { Button } from '../../Components/Html';

export const _scrollView = (p) => {
  const ChangeStyle = (p.width > p.height) ? { marginBottom: 10, flex: 1 } : { flex: 1 }
  return <ScrollView style={[ChangeStyle, p.style]} {...p} contentContainerStyle={[{ flexGrow: 1, width: '100%', height: '100%' }, p.contentContainerStyle]} >{p.children}</ScrollView>
}

const Home = (p) => {
  // const p = context()
  p._food.setPagination()
  p._food.getTitleFood(p.show)
  p._food.backHandler()
  p._food.setorientation()
  p._user._token()
  p._user._tokenValue()

  return (
    <View style={styles.container}>
      <View style={{ height: 150, width: '100%', }} >
        <Image style={{ width: 130, height: 130, position: 'absolute', top: 20 }} source={require('../../assets/images/logo.jpg')} />
        <svg style={{ position: 'absolute',left:0, maxHeight:'89%'}}  viewBox="200 60 1100 240"><path fill="#103" d="M0,224L80,240C160,256,320,288,480,261.3C640,235,800,149,960,101.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0"></path></svg>
      </View>
      <ScrollView contentContainerStyle={styles.containerFood} style={{ height: 400, width: '100%' }} >
        {!p.foods.length ?
          <Loading style={{ top: 70 }} animating={!p.foods.length ? true : false} />
          :
          p.tokenValue.isAdmin !== 'courier' ?
            p.foods.map((food) => (
              <TouchableOpacity key={food._id} style={[styles.pressOpacity,{marginVertical:10}]}
                onPress={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
                <View style={styles.containImageShadow}>
                  <Image source={{ uri: `${localhost}/upload/food/${food.imageUrl}` }} style={[styles.imageFood]} />
                </View>
                <Text style={[styles.textTitle]}>{food.title}</Text>
              </TouchableOpacity>
            ))
            :
            <>
              <View justifyContent='center' height={'55%'} width={100} alignSelf={'center'} >
                <Button onPress={() => p.navigation.navigate("Address")} >address</Button>
              </View>
              <Text outline bgcolor='red' style={{ width: 100, alignSelf: 'center', marginTop: 'auto', textAlign: 'center', color: 'red', position: 'absolute', bottom: 15 }} onPress={() => p.navigation.navigate("Logout")}>logout</Text>
            </>
        }
      </ScrollView>
    </View>
  )
}
export default Home