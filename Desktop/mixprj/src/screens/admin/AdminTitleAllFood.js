import React from 'react';
import { Button, Scroll, Span, Table } from '../../Components/Html';
import s from "./Admin.module.scss"
import Loading from '../../Components/Loading'
import Modal from './Modal';
import Drawer from '../../Components/Drawer';


const drawer = [
  { name: 'AdminTitleAllFood', title: 'پنل ادمین' },
  { name: 'Address', title: 'فیش سفارشات' },
  { name: 'ListAvailable', title: 'لیست غذا های ناموجود' },
  { name: 'Notifee', title: 'ارسال نوتیفیکیشن' },
  { name: 'AddAdmin', title: 'اضافه کردن پیک موتوری' },
  { name: 'DeleteAdmin', title: 'قطع کردن دسترسی پیک موتوری' },
  { name: 'ChangeAdmin', title: 'تغییر ادمین' },
  { name: 'DeleteAllAddress', title: 'حذف تمام فیش ها' },
]

const AdminTitleAllFood = function (p) {
  p._food.getTitleFood([p.showModal, p.show])
  p._food.setPagination()
  return (
    <Drawer name={p.route.name} title={'پنل ادمین'} group={drawer} iconRight={{name:'home',onClick:()=>{p.navigation.navigate('Home')}}} bgcolor="#fff" style={{ overflow: 'hidden', shadowRadius: 9,shadowOffset: {width:.1,height:.1}, shadowOpacity:.15 }}>
      <Scroll containClass={s.container}>
      <Button mt={2} h={40} w='89.8%' onPress={() => p.navigation.navigate("CreateTitleAllFood")}>ساخت دسته ی اغذیه</Button>

        <Span class={s.containTable} >
          {
            !p.foods.length ?
              <Loading style={{ top: 30 }} animating={p.foods.length ? false : true} />
              :
              <Table
                color={['#555', '#656565', 'white']}
                border={[1, '#353535']}
                header={['edit', 'دیدن', 'پاک کردن', 'عنوان']}
                body={['edit', 'دیدن', 'پاک کردن', 'title']}
                btn3={'#d33'}
                btn3onClick={() => { p.setshowModal(true); p.setid(p.foods[p.$food[1]]._id) }}
                btn2={'#07d'}
                btn2onClick={() => { p.navigation.navigate("AdminChildTable", { id: p.foods[p.$food[1]]._id, title: p.foods[p.$food[1]].title }) }}
                btn1={'#2b3'}
                btn1onClick={() => { p.navigation.navigate("EditTitleAllFood", { id: p.foods[p.$food[1]]._id, title: p.foods[p.$food[1]].title, show: p.showModal }) }}
                fontSize={16}
                object={p.foods}
                setobject={p.set$food}
                mt={10}
              />
          }

        <Modal showModal={p.showModal} setshowModal={p.setshowModal} id={p.id} message={'حذف شود؟ ' + " (" + p.foods[p.$food[1]]?.title + ')'} _admin={p._admin} />
        </Span>
      </Scroll>
    </Drawer>

  )
}

export default AdminTitleAllFood