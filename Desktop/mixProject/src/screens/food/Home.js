import React from 'react'
import s from './Food.module.scss'
import { Loading, Button, H1, Img, P, Scroll, Span, ThOpacity, FlatList } from '../../Components/Html';
import Svg from './svg/Svg';
import { Platform } from 'react-native';

const Home = (p) => {
  // const p = context()
  p._food.setPagination()
  p._food.backHandler()
  p._user._token()
  p._user._tokenValue()


  return (
    <Span class={s.container}>
      <Svg width={p.width} />
      {Platform.OS === 'web' ?
       <Scroll class={s.scroll} containClass={s.h_scrollContain} style={{maxWidth:1100}} >
        {!p.foods.length ?
          <Loading h={400} />
          :
          p.tokenValue.isAdmin !== 'courier' ?
            p.foods.map((food) => (
              <ThOpacity key={food._id} class={s.pressOpacity} onClick={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
                <Img alt={food.title} src={{ uri: `${p.localhost}/upload/food/${food.imageUrl}` }} class={s.imageFood} containClass={[s.imageFood, s.containImageShadow]} />
                <P class={s.textTitle} >{food.title}</P>
              </ThOpacity>
            ))
            :
            <>
              <Span class={s.courierContain}>
                <Button onPress={() => p.navigation.navigate("Address")} >address</Button>
              </Span>
              <Button outline bgcolor='red' class={s.logoutBtn} onPress={() => p.navigation.navigate("Logout")}>logout</Button>
            </>
        }
      </Scroll>
        :
        <FlatList
          columnWrapperStyle={{ alignSelf: 'center' }}
          numColumns={3}
          keyExtractor={(f) => f && f._id.toString()}
          data={p.foods}
          renderItem={({ item, index }) => (
            p.tokenValue.isAdmin !== 'courier' ?
              <ThOpacity key={item._id} class={s.pressOpacity} webStyle={{ minWidth: '30%' }} onClick={() => { p.navigation.navigate(`ChildFood`, { id: item._id, title: item.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
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
        />
      }
    </Span>
  )
}
export default Home