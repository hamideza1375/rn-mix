// import React, { useState } from 'react';
// import { SafeAreaView, Text, View } from 'react-native';
// import Form from '../../Components/Form';


// function App() {

//   const [fullname, setFullname] = useState()
//   const [email, setEmail] = useState()
//   const [password, setPassword] = useState()
//   const [confirmPassword, setConfirmPassword] = useState()
//   const [checkbox, setCheckbox] = useState()
//   const [message, setMessage] = useState()
//   const [captcha, setCaptcha] = useState(true)

//   return (
//         <Form
//           f e p cP
//           fSwiper
//           fIconLeft={<Text style={{ color: 'white', backgroundColor: 'blue', padding: 7 }}>del</Text>}
//           fIconRight={<Text style={{ color: 'white', backgroundColor: 'red', padding: 7 }}>del</Text>}
//           captcha={captcha} setCaptcha={setCaptcha} host="192.168.42.34"
//           fullname={fullname} setFullname={setFullname}
//           email={email} setEmail={setEmail}
//           password={password} setPassword={setPassword}
//           confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
//           checkbox={checkbox} setCheckbox={setCheckbox}
//           message={message} setMessage={setMessage}
//           onPress={() => alert('goood')}
//         >
//           فراموشی رمز عبور
//         </Form>
//   )
// }



// export default App;






import React from 'react'
import s from './Food.module.scss'
import Loading from '../../Components/Loading'
import { Button, H1, Img, P, Scroll, Span, ThOpacity } from '../../Components/Html';
import _Alert from '../../utils/alert.js';


const Home = (p) => {
  // const p = context()
  p._food.setPagination()
  p._food.backHandler()
  p._user._token()
  p._user._tokenValue()


  return (
    <Span class={s.container}>
      <Span class={s.svgContainer} >
        <Img class={s.smallLogo} src={require('../../assets/images/logo.jpg')} />
        <svg style={{ position: 'absolute',left:0, maxHeight:'89%'}}  viewBox="200 60 1100 240"><path fill="#103" d="M0,224L80,240C160,256,320,288,480,261.3C640,235,800,149,960,101.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0"></path></svg>
      </Span>
      <Scroll class={s.scroll} containClass={s.h_scrollContain} >
        {!p.foods.length ?
          <Loading />
          :
          p.tokenValue.isAdmin !== 'courier' ?
            p.foods.map((food) => (
              <ThOpacity key={food._id} class={s.pressOpacity} onClick={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood), p.setass(!p.ass) }} >
                  <Img alt={food.title} src={{ uri: `${p.localhost}/upload/food/${food.imageUrl}` }} class={s.imageFood} containClass={[s.imageFood,s.containImageShadow]}/>
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