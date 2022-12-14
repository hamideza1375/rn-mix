import React from 'react'
import { View, Text, ImageBackground, FlatList, Platform } from 'react-native'
import { Button } from '../../Components/Html'
import styles from "./styles/Food.js"
import Card from '../../Components/Card';
import Loading from '../../Components/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CreateComment } from './form/CreateComment';
import { EditComment } from './form/EditComment';
import Pagination from '../../Components/Pagination';

const SingleFood = (p) => {


  p._food.getsinglefood()
  p._food.getCommentSingle()
  p._food.getImageProfile()
  p._food.findCmment()
  p._food.header()
  const editComment = (id) => p._food.pressIconEdit(id)
  const deleteComment = (id) => p._food.deleteComment(id)

  return (
    <>
      <View style={[styles.scrollContain, { backgroundColor: 'white' }]}>
        {!p.showForm && !p.showForm2 &&
          <View style={{ alignItems: 'center', width: '100%' }} >
            {
              p.singlefood && p.singlefood.title ?
                <>
                  <View style={styles.head}>
                    <ImageBackground style={{
                      height: '100%'
                    }} source={{ uri: `${p.localhost}/upload/food/${p.singlefood.imageUrl}` }} >
                      <Text style={styles.title}>{p.singlefood.title}</Text>
                    </ImageBackground>
                  </View>
                  <View style={[styles.containPrice, { backgroundColor: Platform.OS === 'android' ? '#fa5a' : '#fa5d' }]}>
                    <View style={{ width: p.show ? '100%' : 'auto' }}>
                      <Text style={styles.info}
                        onPress={(e) => p.setshow(!p.show)}
                      >توضیحات: {!p.show ? p.truncate(p.singlefood.info, 9) : p.singlefood.info + ' (کمتر)'}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.price}>قیمت: {p.singlefood.price} تومان</Text>
                    </View>
                  </View>
                </>
                :
                <Loading style={{ top: 70 }} animating={p.singlefood ? false : true} />
            }
          </View>}
        <View style={[{ backgroundColor: Platform.OS === 'android' ? '#fa59' : '#fa5c' }, { minHeight: 'calc(100vh - 321px)', maxHeight: '100vh', width: '100%', paddingTop: 10 }]}>

          <View style={{ width: '100%', alignItems: "center", marginBottom: 15, marginTop: 5 }} >

            {
              !p.showForm && <Button bgcolor='#fa59' color="#333" style={styles.btnShow} onPress={() => { p.sendMessage ? p.setshowForm2(!p.showForm2) : editComment(p.allcomment.find(comment => comment.starId === p.tokenValue.userId)?._id) }}>
                {!p.showForm2 ? p.sendMessage ? ' ارسال نظر' : ' ویرایش نظر' : ' بازگشت'}
              </Button>
            }
            {!p.showForm2 && p.showForm && <Button bgcolor='#fa59' color="#333" style={styles.btnShow} onPress={() => { p.setshowForm(false) }}>
              بازگشت
            </Button>}
            {p.showForm2 ?
              p.permission || p.tokenValue.isAdmin === 'chief' ?
                <View style={{ paddingHorizontal: 15, paddingBottom: 15, minWidth: '70%', alignSelf: 'center' }} >
                  <CreateComment {...p} id3={p.sendMessage ? p.id3 : null} />
                </View>
                :
                <View onLayout={() => {
                  p.setshowForm2(false)
                  alert('برای ارسال نظر باید ثبت نام کرده و یا قبلا از این غذا سفارش باشین')
                }} ></View>
              :
              <></>
            }
          </View>

          {p.showForm &&
            <View style={{ paddingHorizontal: 15, paddingBottom: 15, minWidth: '70%', alignSelf: 'center' }} >
              <EditComment {...p} id={p.route.params.id} id2={p.route.params.id2} id3={p.id3} />
            </View>
          }
          {
            !p.showForm && !p.showForm2 &&
            <FlatList
              numColumns={1}
              data={p.currentComment}
              keyExtractor={(f, i) => i.toString()}
              contentContainerStyle={{ alignItems: 'center', width: '100%' }}
              style={{ width: '100%' }}
              renderItem={({ item }) => (
                <View style={[styles.containComment, { maxWidth: '80%', alignSelf: 'center' }]}>
                  <Card
                    bgcolor={Platform.OS === 'android' ? '#fa5b' : '#fa5'}
                    color='black'
                    headerRow={
                      <View style={{ flexDirection: 'row', }} >
                        <View style={{ flexDirection: 'row', width: '60%' }} >
                          <Text style={{ color: '#222' }} >{item.fullname}</Text>
                        </View>
                        {(p.tokenValue?.isAdmin === 'chief') || (item.starId === p.tokenValue.userId) ?
                          <View style={{ top: -4, justifyContent: 'center', flexDirection: 'row', marginRight: 'auto', minWidth: 120 }} >
                            <View style={{ minWidth: 45, justifyContent: 'flex-start', flexDirection: 'row', }} >
                              <Icon name='edit' size={19} color='#742e' onPress={() => editComment(item._id)} />
                            </View>
                            <View style={{ minWidth: 45, justifyContent: 'flex-start', flexDirection: 'row', justifyContent: 'flex-start', }} >
                              <Icon name='trash' size={19} color='#742e' onPress={() => deleteComment(item._id)} />
                            </View>
                          </View>
                          :
                          <View style={{ top: -4, justifyContent: 'center', flexDirection: 'row', marginRight: 'auto', minWidth: 150 }} />
                        }
                      </View>
                    }
                    body={item.message}
                    img={!item.imageUrl ?
                      require("../../assets/images/user2.jpg")
                      :
                      { uri: `${p.localhost}/upload/profile/${item.imageUrl}` }}
                    imageStyle={styles.imgCardComment}
                    dr='rtl'
                    style={{ width: '400px', maxWidth: '90%', marginVertical: 10 }}
                  />
                </View>
              )}
            />}

          <View style={{ height: '7%', minHeight: 50, position: 'absolute', bottom: 11, alignItems: 'center', alignSelf: 'center' }} >
            <Pagination
              food={p.allcomment}
              setcurrent={p.setcurrentComment}
              pageLimit={p.pageLimit}
              ass={p.ass2}
              page={p.page2}
              setpage={p.setpage2}
              currentPage={p.currentPage2}
              setcurrentPage={p.setcurrentPage2}
            />
          </View>

        </View>
      </View>

    </>
  )
}
export default SingleFood