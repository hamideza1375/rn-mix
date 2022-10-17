import React, { useState } from 'react';
import List from './components/List'
import { Div } from './components/Html';


function App() {
  const [hidden, sethidden] = useState(true)

  return (
    <Div
      onClick={() => { sethidden(!hidden) }}
      style={{ flex: 1, direction: 'rtl', borderWidth: 2 }} >

      <List
        hidden={hidden} sethidden={sethidden}
        fontSize={25}
        iconSize={35}
        icon='download'
        icon2='youtube'
        iconPress={() => { alert(1) }}
        icon2Press={() => { alert(2) }}
        header="توضیحات"
        body="سلام"
      />

      <List
        hidden={hidden} sethidden={sethidden}
        fontSize={25}
        iconSize={35}
        icon='download'
        icon2='youtube'
        iconPress={() => { alert(1) }}
        icon2Press={() => { alert(2) }}
        header="توضیحات"
        body="سلام"
      />

      <List
        hidden={hidden} sethidden={sethidden}
        fontSize={25}
        iconSize={35}
        icon='download'
        icon2='youtube'
        iconPress={() => { alert(1) }}
        icon2Press={() => { alert(2) }}
        header="توضیحات"
        body="سلام"
      />


    </Div>
  )
}

export default App;