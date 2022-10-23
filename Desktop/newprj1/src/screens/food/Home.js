import React from 'react'
import s from './Food.module.scss'
import Loading from '../../Components/Loading'
import { Button, H1, Img, P, Scroll, Span, ThOpacity } from '../../Components/Html';
import _Alert from '../../utils/alert.js';
import Svg from './svg/Svg';

const Home = (p) => {
  // const p = context()
  p._food.setPagination()
  p._food.backHandler()
  p._user._token()
  p._user._tokenValue()


  return (
    <Span class={s.container}>
     <Svg width={p.width} />
      <Scroll class={s.scroll} containClass={s.h_scrollContain} >
        {!p.foods.length ?
          <Loading h={400} />
          :
          p.tokenValue.isAdmin !== 'courier' ?
            p.foods.map((food) => (
              <ThOpacity key={food._id} class={s.pressOpacity} onClick={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
                <Img alt={food.title} source={{ uri: `${p.localhost}/upload/food/${food.imageUrl}` }} class={s.imageFood} containClass={[s.imageFood, s.containImageShadow]} />
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
    </Span>
  )
}
export default Home