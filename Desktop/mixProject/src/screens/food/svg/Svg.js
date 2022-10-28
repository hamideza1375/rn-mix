import React from 'react'
import {WebView} from 'react-native-webview'
import { Img, Span } from '../../../Components/Html'
import s from '../Food.module.scss'

let box

const Svg = (p) => {


if(p.width <= 500){
  box = '270 15 880 270'
}
else{
  box = '200 60 1100 240'

}
  return (
      <Span class={s.svgContainer} style={{ top: -42, borderTopWidth: 1 }}  >
        <WebView style={{ position: 'absolute', left: -5, top: 0, right: 0, minHeight: 300 }} source={{ html: `<svg style="transform:scale(1.02)" viewBox="${box}"><path fill="#103" d="M0,224L80,240C160,256,320,288,480,261.3C640,235,800,149,960,101.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0"></path></svg>` }} />
        <Img class={s.smallLogo} src={require('../../../assets/images/logo.png')} />
      </Span>
  )
}

export default Svg