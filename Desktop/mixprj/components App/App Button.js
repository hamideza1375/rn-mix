import React from 'react';
import {Button} from './components/Html';

const App = () => {

  return (
    <>
      <Button
        outline
        bgcolor={'red'}
        color={'red'}
        border={[1, 'green']}
        fontSize={17}
        height={46}
        width={110}
        padding={1}
        paddingTop={1}
        paddingBottom={1}
        paddingLeft={1}
        paddingRight={1}
        paddingVertical={1999}
        paddingHorizontal={198}
        margin={44}
        marginTop={1}
        marginBottom={1}
        marginLeft={1}
        marginRight={1}
        marginVertical={1}
        marginHorizontal={1}
        onClick={() => { alert(9) }}
      >
        onClick
      </Button>

    </>
  )
}
export default App