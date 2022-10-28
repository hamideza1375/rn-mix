
import React from 'react'
import { Platform } from 'react-native'
import { Pagination, Loading, Card, Icon, Button, ImgBackground, Span, P, FlatList, StyleSheet, Container, Div } from '../../Components/Html'
import s from './Food.module.scss'
import { CreateComment } from './form/CreateComment';
import { EditComment } from './form/EditComment';
import spacePrice from '../../utils/spacePrice'

const SingleFood = (p) => {
  p._food.getImageProfile()
  p._food.getsinglefood()
  p._food.getCommentSingle()
  p._food.findCmment()
  p._food.header()
  const editComment = (id) => p._food.pressIconEdit(id)
  const deleteComment = (id) => p._food.deleteComment(id)

  return (
<Container class={s.s_container} webStyle={{minHeight:'100vh',height:'100%'}} >
      {!p.showForm && !p.showForm2 &&
        <Span class={s.imgBackgroundContainer} webStyle={{maxHeight:300}} >
          {
            p.singlefood && p.singlefood.title ?
              <>
                <Span class={s.head}>
                  <ImgBackground style={{ height: '100%' }} src={{ uri: `${p.localhost}/upload/food/${p.singlefood.imageUrl}` }} >
                  </ImgBackground>
                </Span>
                <Span bgcolor={Platform.OS === 'android' ? '#fa5a' : '#f82'} class={[s.containPrice]} >
                  <Span w={p.show ? '100%' : 'auto'}>
                    <P class={s.info} onClick={(e) => p.setshow(!p.show)}
                    >توضیحات: {!p.show ? p.truncate(p.singlefood.info, 9) : p.singlefood.info + ' (کمتر)'}</P>
                  </Span>
                  <Span>
                    <P class={s.price}>قیمت: {spacePrice(p.singlefood.price)} ت</P>
                  </Span>
                </Span>
              </>
              :
              <Loading style={{ minHeight: 100 }} />
          }
        </Span>}

        <Span iosStyle={p.showForm && {marginTop:40}} class={s.btnContainer} >
          {!p.showForm && <Button h={'100%'} w={'85%'} style={{ minHeight: 40, maxHeight: 40 }} bgcolor={Platform.OS === 'android' ?'#ff8522':'#ff8222' }color="#333" onClick={() => { p.setass2(!p.ass2); p.set ? p.setshowForm2(!p.showForm2) : editComment(p.allcomment.find(comment => comment.starId === p.tokenValue.userId)?._id) }}>
            {!p.showForm2 ? p.sendMessage ? ' ارسال نظر' : ' ویرایش نظر' : ' بازگشت'}
          </Button>}
          {!p.showForm2 && p.showForm && <Button h={'100%'} w={'85%'} style={{ minHeight: 40, maxHeight: 40 }} bgcolor={Platform.OS === 'android' ?'#ff8522':'#ff8222' }color="#333" onClick={() => { p.setass2(!p.ass2); p.setshowForm(false) }}>
            بازگشت
          </Button>}

          {p.sendMessage ?
            <>
              {p.showForm ? p.permission || p.tokenValue.isAdmin === 'chief' ?
                <Span h={500} class={s.containerComment} >
                  <CreateComment {...p} id3={p.sendMessage ? p.id3 : null} />
                </Span>
                :
                <Span onLayout={() => {
                  alert('برای ارسال نظر باید ثبت نام کرده و یا قبلا از این غذا سفارش داده باشین')
                  p.setshowForm(false)
                }} >
                  <P color='transparent' >s</P>
                </Span>
                : <></>}
            </> :
            <>
              {p.showForm &&
                <Span h={500} class={s.containerComment} >
                  <EditComment {...p} id={p.route.params.id} id2={p.route.params.id2} id3={p.id3} />
                </Span>}
            </>}
        </Span>

        {!p.showForm && !p.showForm2 && 
        <>
            {(!p.currentComment.length) ?
              <Loading /> :
              <FlatList
              id='flatlist'
                numColumns={1}
                data={p.currentComment}
                style={{maxHeight: '50%',height:'50%', width:'80%', alignSelf:'center', borderWidth:1, borderColor:'#fa6'}}
                keyExtractor={(f, i) => i.toString()}
                contentContainStyle={{ alignItems: 'center', width: '100%', paddingBottom: 5 }}
                renderItem={({ item }) => (
                  <Span alignSelf='center' class={s.containComment}>
                    <Card
                      bgcolor={Platform.OS === 'android' ? '#fa5b' : '#f71'}
                      color='black'
                      headerRow={
                        <Span fd='row' >
                          <Span fd='row' >
                            <P p={0} color='#222' >{item.fullname}</P>
                          </Span>
                          {(p.tokenValue?.isAdmin === 'chief') || (item.starId === p.tokenValue.userId) ?
                            <Span class={s.cardHeaderRow} >
                              <Span class={s.iconContainer} >
                                <Icon name='edit' size={19} color='#742e' onClick={() => editComment(item._id)} />
                              </Span>
                              <Span justifyContent='flex-start' >
                                <Icon name='trash' size={19} color='#742e' onClick={() => deleteComment(item._id)} />
                              </Span>
                            </Span>
                            :
                            <Span class={s.cardHeaderRow} />
                          }
                        </Span>
                      }
                      body={item.message}
                      img={item.imageUrl === undefined || item.imageUrl === 'undefined' || item.imageUrl === null || item.imageUrl === '' ?
                        require("../../assets/images/user.jpg")
                        :
                        { uri: `${p.localhost}/upload/profile/${item.imageUrl}` }}
                      imageStyle={style.imgcard}
                      dr='ltr'
                      style={{ width: '90%', alignSelf: 'center', maxWidth: 400, minWidth: 250, marginLeft: 'auto', marginRight: 'auto' }}
                    />
                  </Span>
                )}
              />}
         

          <Span mt={8} style={{height:50,alignSelf:'center'}} >
            {p.allcomment.length ?
              <Pagination
              food={p.allcomment}
              setcurrent={p.setcurrentComment}
              pageLimit={8}
              ass={p.ass2}
              page={p.page2}
              setpage={p.setpage2}
              currentPage={p.currentPage2}
              setcurrentPage={p.setcurrentPage2}
              />
              :
              <></>
            }
          </Span>
              </>}

    </Container>
  )
}
export default SingleFood
const style = StyleSheet.create({
  imgcard: {
    top: -5,
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
})