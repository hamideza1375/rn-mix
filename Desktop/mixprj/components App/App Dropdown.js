import React, { useState } from 'react';
import { Br, Div } from './components/Html'
import Dropdown from './components/Dropdown';
import Icon from 'react-native-vector-icons/AntDesign';

function App() {

  const [show, setshow] = useState(true)

  return (
    <Div style={{ width: 500, height: 500, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderWidth: 1 }}
      onClick={() => { setshow(setshow(!show)); }}
    >
      <Dropdown
        iconFalse
        top
        icon='paperclip'
        showBgcolor="#888"
        show={show}
        setshow={setshow}
      >
        <Div style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
          <Icon name={'image'} color="#ddd" size={25} style={{ padding: 7 }} />
          <Icon name={'video'} color="#ddd" size={25} style={{ padding: 7 }} />
        </Div>
      </Dropdown>
      <Br />
      <Br />
      <Dropdown
        icon='paperclip'
        showBgcolor="#888"
        show={show}
        setshow={setshow}
      >
        <Div style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
          <Icon name={'image'} color="#ddd" size={25} style={{ padding: 7 }} />
          <Icon name={'video'} color="#ddd" size={25} style={{ padding: 7 }} />
        </Div>
      </Dropdown>
    </Div>
  )
}



export default App;