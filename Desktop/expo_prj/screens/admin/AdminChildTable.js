import React from 'react';
import { View } from 'react-native';
import { Button, Table } from '../../Components/Html';
import styles from "./styles/Admin.js"
import Loading from '../../Components/Loading'
import _Modal from './Modal';
import Pagination from '../../Components/Pagination';

const AdminChildTable = (p) => {
  const sendSetavailable = async (available, id, id2) => p._admin.available(available, id, id2)
  const deleteUnmunt = async () => p._admin.deleteUnmunt(p.id2)
  p._food.getChildFood2()
  return (
    <View flex={1} style={[styles.container]}>
      <View style={{width:'90%', alignSelf:'center'}} >
        <Button style={{height:32}} ph={8} mv={5} onPress={() => p.navigation.navigate("CreateChildFood", { id: p.route.params.id, })}>ساخت </Button>
        <View style={{height:'calc(100vh - 165px)', width:'100%'}}>
          {!p.current ?
            <Loading />
            :
            <Table
              color={['#555', '#656565', 'white']}
              header={['موجودیت', 'ویرایش', 'حذف', ' قیمت', 'عنوان']}
              body={['موجودیت', 'ویرایش', ' حذف', 'price', 'title']}
              btn3={'#d33'}
              btn3onClick={() => { p.setshowModal(true); p.setid(p.route.params.id); p.setid2(p.current[p.$food[1]]._id) }}
              btn2={'#2b3'}
              btn2onClick={() => { p.navigation.navigate("EditChildFood", { id: p.route.params.id, id2: p.current[p.$food[1]]._id, title: p.current[p.$food[1]].title }) }}
              btn1={'#999'}
              btn1onClick={() => { p.setshow(true); p.setid2(p.current[p.$food[1]]._id) }}
              btn1Opacity
              object={p.current}
              setobject={p.set$food}
            />
          }
        </View>
        <_Modal availabe={(param) => { sendSetavailable(param, p.route.params.id, p.id2); p.setshow(false) }} showModal={p.show} setshowModal={p.setshow} message={'موجود نیست؟' + " (" + p.current[p.$food[1]]?.title + ')'} _admin={p._admin} />
        <_Modal deleteUnmunt={deleteUnmunt} showModal={p.showModal} setshowModal={p.setshowModal} id={p.id} id2={p.id2} message={'حذف شود؟ ' + " (" + p.current[p.$food[1]]?.title + ')'} _admin={p._admin} />
      </View>

      <View style={{ flex:.1,top:3, bottom: 1, zIndex: 111, alignItems: 'center', alignSelf: 'center' }} >
          {p.foodMap.get(p.route.params.id) &&
            <Pagination
            food={p.foodMap.get(p.route.params.id)}
            setcurrent={p.setcurrent}
            pageLimit={p.pageLimit}
            ass={p.ass}
            page={p.page}
            setpage={p.setpage}
            currentPage={p.currentPage}
            setcurrentPage={p.setcurrentPage}
            // id={p.route.params.id}
            // currentMap={p.currentMap}
            />
          }
        </View>

    </View>
  )
}
export default AdminChildTable

