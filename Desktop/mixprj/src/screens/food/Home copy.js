import React from 'react'
import {Div, ChangeText } from '../../Components/Html'


const Home1 = (p) => {

  return (
    <Div style={{textAlign:'right'}} >
      <ChangeText $={p.$} id={'salam'} > dcjfnejnjnjnjnj </ChangeText>
    

    <h1 onClick={()=>{ 
      p.$.get('salam').styles({fontSize:33,color:'red'})
       }}>salam</h1>
    
    </Div>
  )
}

export default Home


import React from 'react'
import { FlatList, H1, Div, Row, Span, ThOpacity, Press, ImgBackground, Scroll, ScrollHorizontal, FlatListHorizontal, H4, H5, H6, H2, H3, P, I, Img} from '../../Components/Html'
import s from './Food.module.scss'

const Home = p => {
  return (
    <Div id='id' class={s.p} >
   
    <H1 onClick={()=>{ p.$.id('id').$({width:5})}} >rfrfrfrf</H1>
    </Div>

  )
}







// import React from 'react'
// import s from './Food.module.scss'
// import Loading from '../../Components/Loading'
// import { Button, Img, P, Scroll, Span, ThOpacity } from '../../Components/Html';
// import _Alert from '../../utils/alert.js';


// const Home = (p) => {
//   // const p = context()
//   p._food.setPagination()
//   p._food.getTitleFood(p.show)
//   p._food.backHandler()
//   p._user._token()
//   p._user._tokenValue()
  

//   return (
//     <Span class={s.container}>
//       <Span class={s.svgContainer} >
//         <Img class={s.smallLogo} src={require('../../assets/images/logo.jpg')} />
//         <svg style={{ position: 'absolute',left:0, maxHeight:'89%'}}  viewBox="200 60 1100 240"><path fill="#103" d="M0,224L80,240C160,256,320,288,480,261.3C640,235,800,149,960,101.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0"></path></svg>
//       </Span>
//       <Scroll class={s.scroll} containClass={s.h_scrollContain} >
//         {!p.foods.length ?
//           <Loading />
//           :
//           p.tokenValue.isAdmin !== 'courier' ?
//             p.foods.map((food) => (
//               <ThOpacity key={food._id} class={s.pressOpacity}
//                 onPress={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
//                 <Span class={s.containImageShadow}>
//                   <Img alt={food.title} src={{ uri: `${p.localhost}/upload/food/${food.imageUrl}` }} class={s.imageFood} />
//                 </Span>
//                 <P p={0} class={s.textTitle}>{food.title}</P>
//               </ThOpacity>
//             ))
//             :
//             <>
//               <Span class={s.courierContain}>
//                 <Button onPress={() => p.navigation.navigate("Address")} >address</Button>
//               </Span>
//               <Button outline bgcolor='red' class={s.logoutBtn} onPress={() => p.navigation.navigate("Logout")}>logout</Button>
//             </>
//         }
//       </Scroll>
//     </Span>
//   )
// }
// export default Home