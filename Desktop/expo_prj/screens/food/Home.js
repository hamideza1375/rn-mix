import React from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import styles from "./styles/Food.js"
import Loading from '../../Components/Loading'
import { Button } from '../../Components/Html';
import { Helmet } from 'react-helmet';


const Home = (p) => {
  // const p = context()
  p._food.setPagination()
  p._food.getTitleFood(p.show)
  p._food.backHandler()
  p._user._token()
  p._user._tokenValue()
  

  return (
    <View style={styles.container}>
      <View style={{ height: 150, width: '100%', }} >
        <Image style={{ width: 130, height: 130, position: 'absolute', top: 20 }} source={require('../../assets/images/logo.jpg')} />
        <svg style={{ position: 'absolute',left:0, maxHeight:'89%'}}  viewBox="200 60 1100 240"><path fill="#103" d="M0,224L80,240C160,256,320,288,480,261.3C640,235,800,149,960,101.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0"></path></svg>
      </View>
      <ScrollView contentContainerStyle={styles.containerFood} style={{ width: '100%' }} >
        {!p.foods.length ?
          <Loading style={{ top: 70 }} animating={!p.foods.length ? true : false} />
          :
          p.tokenValue.isAdmin !== 'courier' ?
            p.foods.map((food) => (
              <TouchableOpacity key={food._id} style={[styles.pressOpacity,{marginVertical:10}]}
                onPress={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
                <View style={styles.containImageShadow}>
                  <Image alt={food.title} source={{ uri: `${p.localhost}/upload/food/${food.imageUrl}` }} style={[styles.imageFood]} />
                </View>
                <Text style={[styles.textTitle]}>{food.title}</Text>
              </TouchableOpacity>
            ))
            :
            <>
              <View style={{height:'55vh',  width:100, alignSelf:'center'}}>
                <Button onPress={() => p.navigation.navigate("Address")} >address</Button>
              </View>
              <Button outline bgcolor='red' style={{ width: 100, alignSelf: 'center', textAlign: 'center', position: 'absolute', bottom: 5 }} onPress={() => p.navigation.navigate("Logout")}>logout</Button>
            </>
        }
      </ScrollView>
    </View>
  )
}
export default Home