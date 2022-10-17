import React from 'react';
import { Table } from './components/Html'



function App() {
  return (
      <Table 
       color={['#555','#656565','white']}
        header={['عنوان', 'ویرایش', 'حذف','دیدن','پاک کردن', 'توضیحات',]}
        body={
          [ 
            ['عنوان', 'ویرایش', 'حذف','دیدن','پاک کردن', 'توضیحات', ],
            ['عنوان', 'ویرایش', 'حذف','دیدن','پاک کردن', 'توضیحات', ],
            ['عنوان', 'ویرایش', 'حذف','دیدن','پاک کردن', 'توضیحات', ],
            ['عنوان', 'ویرایش', 'حذف','دیدن','پاک کردن', 'توضیحات', ],
        ]
        }
        btn1={'red'}
        btn1onClick={()=>{alert('red')}}
        btn2={'green'}
        btn2onClick={()=>{alert('green')}}
        btn3={'pink'}
        btn3onClick={()=>{alert('pink')}}
        btn4={'blue'}
        btn4onClick={()=>{alert('blue')}}
        btn5={'black'}
        btn5onClick={()=>{alert('black')}}
        btn6={'silver'}
        btn6onClick={()=>{alert('silver')}}
        btn7={'yellow'}
        btn7onClick={()=>{alert('yellow')}}
        h={55}
        // fontSize={9}
        />
  )
}



export default App;






