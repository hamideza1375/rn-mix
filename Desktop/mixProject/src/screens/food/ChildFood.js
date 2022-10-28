import React, { useEffect, useState } from 'react'
import s from './Food.module.scss'
import { localhost } from '../../utils/axios/axios'
import { Pagination, Loading, StyleSheet, ImgBackground, Input, P, Press, Span, Icon, Animated, Img, Container, Div } from '../../Components/Html'
import { Platform, FlatList } from 'react-native';

let styleScroll = {}
let numColumns
let numColumns2
let hidden
let hidden2

const ChildFood = (p) => {

  const [item2, setitem] = useState({})
  const [item3, setitem3] = useState({})

  const startScale = () => {
    Animated.timing(p.animScale, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false
    }).start();

    setTimeout(() => {
      setitem({})
      Animated.timing(p.animScale, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false
      }).start();
    }, 1000);
  };

  const open = () => {
    Animated.timing(p.anim, {
      toValue: 80,
      duration: 150,
      useNativeDriver: false
    }).start();
  };

  const close = () => {
    Animated.timing(p.anim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  };

  p._food.getChildFood()
  p._food.allPrice()
  const searcher = (text) => { p._food.sercher(text); p.settextSearch(text) }
  const foodAsc = () => p._food.foodAsc(p.setpage)
  const foodDesc = () => p._food.foodDesc(p.setpage)
  const plus = (index, item) => { p._food.plustNum(index, item, p.setpage, p.page) }
  const minus = (index, item) => { p._food.minusNum(index, item, p.setpage, p.page) }
  const inputPrice = `${p.allprice ? p.allprice : '0'}`
  if (p.width <= 600 && p.width > 280) { styleScroll = styles.containItem; numColumns = 2; numColumns2 = 1 }
  if (p.width <= 600 && p.width > 400) { numColumns2 = 2 }
  if (p.width > 600 && p.width <= 900) { styleScroll = styles.containItemScroll; numColumns = 3; numColumns2 = 3 }
  if (p.width > 900) { styleScroll = styles.containItem2Scroll; numColumns = 4; numColumns2 = 4 }

  if (!p.courseIdValidator(p.route.params.id)) return p.navigation.navigate('NotFound')

  useEffect(() => {
    inputPrice == 0 && close()
    setTimeout(() => {
      setitem3(item2)
    }, 800);
  }, [inputPrice])

  return (
    <Container style={[Platform.OS === 'ios' && {marginTop:40},{overflow:'hidden'}] } >
      <Span h={57} pt={2}>
        <Span class={[s.containHead]}>
          <Icon size={26} style={styles.iconHome} name='home' onPress={() => p.navigation.navigate('Home')} />
          <Input
            flex={1}
            icon="search"
            pColor={'#777'}
            border={[1, '#ccc']}
            autoCapitalize='none'
            autoCorrect={false}
            spellCheck={true}
            value={p.textSearch}
            onChangeText={(text) => searcher(text)}
            p="جستجو"
            h={'85%'}
            mt={6}
            dr='rtl'
          />
          <Span style={{ width: '15%',minWidth:65, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginHorizontal: 4, marginLeft: 8, }} >
            <Icon onPress={foodAsc} size={21} style={{ padding: 4 }} name="arrow-down" color='#555' />
            <Span style={{ paddingHorizontal: 6 }} ></Span>
            <Icon onPress={foodDesc} size={21} style={{ padding: 4 }} name="arrow-up" color='#555' />
          </Span>
        </Span>
      </Span>

      <Span f={Platform.OS === 'web'?1:.8} class={s.viewContainer} style={p.width > p.height && { paddingHorizontal: 8, alignSelf: 'center' }} >
        <>
          {!p.current ?
            <Loading />
            :
            <FlatList
              initialNumToRender={3}
              numColumns={numColumns}
              key={numColumns}
              keyExtractor={(f) => f && f._id.toString()}
              data={p.current}
              contentContainerStyle={{ paddingBottom: inputPrice != 0 ? 130 : 50, width: '99%' }}
              style={{ width: '100%' }}
              renderItem={({ item, index }) => (
                <>
                  <Span style={[styleScroll, { opacity: item.available ? 1 : .4 }, { height: 180 },

                    (item.num > 0) ? styles.infoShadow : styles.silverShadow

                  ]}>

                    <Press style={{ height: '55%', backgroundColor: '#eee' }} onPress={() => { p.navigation.navigate("SingleFood", { title: item.title, id: p.route.params.id, id2: item._id, page: p.page }) }} >
                      <ImgBackground class={[s.img, s.radius]} containClass={s.radius} src={{ uri: `${localhost}/upload/food/${item.imageUrl}` }}>
                        <P p={0} mt='auto' class={s.textTitleChild} >{item.title}</P>
                      </ImgBackground>
                    </Press>
                    <Span class={s.subImg} ph={2}>
                      <Span class={s.ViewSubItem}>
                        <Span pr={3} mt={2} >
                          <P fs={13} p={0} pl={2} fontSize={p.width < 360 ? 10.5 : 13} textAlign='left'>قیمت:{p.spacePrice(item.price)}</P>
                          <Span style={{ top: 12, flexDirection: 'row', alignSelf: 'flex-end' }} >
                            {item.meanStar >= 5 && <Icon name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar > 4 && item.meanStar < 5 && <Icon name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar >= 4 && <Icon name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar > 3 && item.meanStar < 4 && <Icon name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar >= 3 && <Icon name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar > 2 && item.meanStar < 3 && <Icon name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar >= 2 && <Icon name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar > 1 && item.meanStar < 2 && <Icon name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                            {item.meanStar >= 1 && <Icon name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                          </Span>
                        </Span>
                        <Span mt={-2} class={[s.TextPlus]} >
                          {
                            item.available ?
                              <Press dir='rtl' onResponderStart={(e) => {
                                hidden = p.animScale.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [450, e.nativeEvent.pageY - 177]
                                })
                                hidden2 = p.animScale.interpolate({
                                  inputRange: [0, 1],
                                  outputRange:
                                    numColumns2 == 1 && [180, e.nativeEvent.pageX - 100] ||
                                    numColumns2 == 2 && [300, e.nativeEvent.pageX - 100] ||
                                    numColumns2 == 3 && [550, e.nativeEvent.pageX - 100] ||
                                    numColumns2 == 4 && [650, e.nativeEvent.pageX - 100]
                                })
                              }}
                                class={[s.viewIcons]}>
                                <Icon size={20} name="plus" style={{ paddingVertical: 5 }} onPress={() => {
                                  open()
                                  // Platform.OS === 'web' &&  setitem(item)
                                  plus(index, item)
                                  // Platform.OS === 'web' && startScale()
                                }}
                                  color='blue' />
                                  <Span mv={2} />
                                <Icon size={20} name="minus" style={{ paddingVertical: 5 }} onPress={() => {
                                  p.current[index].num > 0 &&
                                    minus(index, item)
                                }
                                } color='red' />
                              </Press>
                              :
                              <P />
                          }
                          <Span class={[s.vpls]} >
                            {
                              item.available ?
                                <>
                                  <P fs={13} p={0} onPress={() => {
                                    p.current[index].num == 0 &&
                                      plus(index, item)
                                  }
                                  } style={{ top: -6, fontSize: 13 }}>افزودن</P>
                                  <P fs={13} p={0} children={p.allprice ? p.current[index] && p.current[index].num.toString() + " " + 'عدد' : '0 ' + 'عدد'}
                                    style={{ marginTop: 3, fontSize: 13 }} />
                                </>
                                :
                                <P fs={13} p={3} style={{ color: 'red', borderWidth: 1, borderColor: 'red', marginTop: 10, width: 50, textAlign: 'right', borderColor: 'red', paddingRight: 5, transform: [{ rotate: '-20deg' }], fontSize: p.width < 360 ? 10.5 : 12 }}>ناموجود</P>
                            }
                          </Span>
                        </Span>
                      </Span>
                    </Span>
                  </Span>
                </>)} />
          }
        </ >
        <Animated.View style={[styles.paginationContain, { bottom: p.anim }]} >
          {p.foodMap.get(p.route.params.id) &&
            <Pagination
              food={p.foodMap.get(p.route.params.id)}
              current={p.current}
              setcurrent={p.setcurrent}
              pageLimit={p.pageLimit}
              ass={p.ass}
              page={p.page}
              setpage={p.setpage}
              currentPage={p.currentPage}
              setcurrentPage={p.setcurrentPage}
            />}
        </Animated.View>

        {item2.title && item2.title != item3.title && <Animated.View style={[{ height: 200, width: 200, transform: [{ scale: p.animScale }], position: 'absolute', borderRadius: 11, borderWidth: 15, borderColor: 'silver', zIndex: 100, top: hidden, left: hidden2 }]} >
          <ImgBackground class={s.img} src={{ uri: `${localhost}/upload/food/${item2.imageUrl}` }}>

          </ImgBackground>
        </Animated.View>}

        <Animated.View
        f={.2}
          onStartShouldSetResponder={() => { p.navigation.navigate(p.tokenValue.fullname ? "FinallFoodPayment" : "Login", { name: 'ChildFood', price: inputPrice }) }}
          style={[styles.buttomPayment, { height: p.anim, }]}>
          <Img webStyle={{marginLeft:15}} class={s.imagePayment} src={{uri:`${localhost}/images/food_image.jpg`}} />
          <Span class={s.ViewPayment}>
            <P p={0} class={s.titleSubTitle} >مشاهده ی سبد و پرداخت 🛒</P>
            <Span class={s.containSubPrice}>
              <P pt={10} class={s.textPayment}>قیمت کل :</P>
              <P pt={10} >{p.spacePrice(inputPrice)} تومان</P>
            </Span>
          </Span>
        </Animated.View>
      </Span>
    </Container>

  )
}

export default ChildFood
const styles = StyleSheet.create({
  iconHome: {
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingTop: 10,
    color: '#777',
  },
  paginationContain: {
    height: 50,
    minHeight: 50,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom:6
  },
  buttomPayment: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    shadowRadius: 6,
    shadowOpacity:Platform.OS === 'ios'? .3:.6,
    shadowColor: 'rgba(90, 90, 90, .5)',
    elevation:10
  },
  infoShadow: {
    shadowRadius: 7,
    shadowColor: 'rgba(64, 138, 134, 0.7)',
  },
  silverShadow: {
    shadowRadius: 6,
    shadowColor: 'rgba(90, 90, 90, .5)',
  },
  containItem: {
    width: '48%',
    margin: '1%',
    height: 230,
    borderRadius: 7,
  },
  containItemScroll: {
    width: '31.4%',
    margin: '1%',
    height: 215,
    borderRadius: 7,
  },
  containItem2Scroll: {
    width: '23%',
    margin: '1%',
    height: 215,
    borderRadius: 7,
  }
})