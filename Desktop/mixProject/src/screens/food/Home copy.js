import React from 'react'
import s from './Food.module.scss'
import { Loading, Button, H1, Img, P, Scroll, Span, ThOpacity,  } from '../../Components/Html';
import Svg from './svg/Svg';
import { FlatList } from 'react-native';

const Home = (p) => {
  // const p = context()
  p._food.setPagination()
  p._food.backHandler()
  p._user._token()
  p._user._tokenValue()


  return (
    <Span class={s.container}>
     <Svg width={p.width} />
     {
       !p.foods.length ?
       <Loading h={400} />
       :
      <FlatList 
      columnWrapperStyle={{alignSelf:'center'}}
      numColumns={3}
      keyExtractor={(f) => f && f._id.toString()}
      data={p.foods}
      renderItem={({ item, index }) => (
    
         
          p.tokenValue.isAdmin !== 'courier' ?
            <ThOpacity key={item._id} class={s.pressOpacity} webStyle={{minWidth:'30%'}} onClick={() => { p.navigation.navigate(`ChildFood`, { id: item._id, title: item.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
                <Img alt={item.title} src={{ uri: `${p.localhost}/upload/food/${item.imageUrl}` }} class={s.imageFood} containClass={[s.imageFood, s.containImageShadow]} />
                <P class={s.textTitle} >{item.title}</P>
              </ThOpacity>
            :
            <>
              <Span class={s.courierContain}>
                <Button onPress={() => p.navigation.navigate("Address")} >address</Button>
              </Span>
              <Button outline bgcolor='red' class={s.logoutBtn} onPress={() => p.navigation.navigate("Logout")}>logout</Button>
            </>
        )}
        />}
    </Span>
  )
}
export default Home