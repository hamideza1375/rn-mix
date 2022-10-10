import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, Image, TextInput, Pressable, ImageBackground, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import styles from "./styles/Food.js"
import { localhost } from '../../utils/axios/axios'
import Pagination from '../../Components/Pagination';
import Loading from '../../Components/Loading'
import spacePrice from '../../utils/spacePrice';
import { courseIdValidator } from '../../utils/IdValidator';
let styleScroll = {}
let numColumns
let numColumns2
let hidden
let hidden2

const ChildFood = (p) => {
  const [item2, setitem] = useState({})
  const [item3, setitem3] = useState({})

  const anim = useRef(new Animated.Value(0)).current;
  const animScale = useRef(new Animated.Value(1)).current;


  const startScale = () => {
    Animated.timing(animScale, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false
    }).start();

    setTimeout(() => {
      setitem({})
      Animated.timing(animScale, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false
      }).start();
    }, 800);

  };







  const open = () => {
    Animated.timing(anim, {
      toValue: 80,
      duration: 150,
      useNativeDriver: false
    }).start();
  };

  const close = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  };


  const scrollRef = useRef()
  p._food.getChildFood()
  p._food.allPrice()
  const searcher = (text) => { p._food.sercher(text); p.settextSearch(text) }
  const foodAsc = () => p._food.foodAsc(p.setpage)
  const foodDesc = () => p._food.foodDesc(p.setpage)
  const plus = (index, item) => { p._food.plustNum(index, item, p.setpage, p.page) }
  const minus = (index, item) => { p._food.minusNum(index, item, p.setpage, p.page) }
  const inputPrice = `${p.allprice ? p.allprice : '0'}`
  if (p.width <= 600 && p.width > 280) { styleScroll = styles.containItem; numColumns = 2;numColumns2 = 1 }
  if (p.width <= 600 && p.width > 400) { numColumns2 = 2 }
  if (p.width > 600 && p.width <= 900) { styleScroll = styles.containItemScroll; numColumns = 3;numColumns2 = 3 }
  if (p.width > 900) { styleScroll = styles.containItem2Scroll; numColumns = 4; numColumns2 = 4 }

  if (!courseIdValidator(p.route.params.id)) return p.navigation.navigate('NotFound')

  useEffect(() => {
    inputPrice == 0 && close()
    setTimeout(() => {
      setitem3(item2)
    }, 800);
  }, [inputPrice])

  return (
    <View style={[{ overflow: 'hidden' }, styles.viewContainer, p.orientation === "LANDSCAPE" && { paddingHorizontal: 22, alignSelf: 'center' }]} >

      <View style={styles.containHead}>
        <View style={styles.viewSearch}>
          <Icon name="search" size={20} color="#999" style={{ padding: 7, flex: 1 }} />
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            spellCheck={true}
            value={p.textSearch}
            onChangeText={(text) => searcher(text)}
            placeholder="جستجو غذا و نوشیدنی" style={styles.search}
          />
        </View>

        <View style={{ width: '15%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginHorizontal: 4, marginLeft: 8, }} >
          <Icon onPress={foodAsc} size={21} style={{ padding: 4 }} name="arrow-down" color='#555' />
          <View style={{ paddingHorizontal: 6 }} ></View>
          <Icon onPress={foodDesc} size={21} style={{ padding: 4 }} name="arrow-up" color='#555' />
        </View>
      </View>





      <View style={{ flex: 1, width: '100%' }}>
        {!p.current ?
          <Loading />
          :
          <FlatList
            initialNumToRender={3}
            numColumns={numColumns}
            key={numColumns}
            keyExtractor={(f) => f && f._id.toString()}
            data={p.current}
            contentContainerStyle={{ paddingBottom: inputPrice != 0 ? 130 : 50, width: '100%' }}
            style={{ width: '100%' }}
            renderItem={({ item, index }) => (
              <>

                <View
                  ref={scrollRef}
                  style={[styleScroll, item.num > 0 ? styles.shadowSuccess : styles.shadowDark,
                    { opacity: item.available ? 1 : .4 }, { height: 180 }
                  ]}>


                  <Pressable style={{ height: '55%' }} onPress={() => { p.navigation.navigate("SingleFood", { id: p.route.params.id, id2: item._id, page: p.page }) }} >
                    <ImageBackground style={[styles.img]} source={{ uri: `${localhost}/upload/food/${item.imageUrl}` }}>
                      <Text style={styles.textTitleChild}>{item.title}</Text>
                    </ImageBackground>
                  </Pressable>
                  <View style={styles.subImg} >
                    <View style={styles.ViewSubItem}>
                      <View style={{ paddingRight: 3, top: 2 }} >
                        <Text style={[{ fontSize: 13.5, textAlign: 'left', fontSize: p.width < 360 ? 10.5 : 13 }]}>قیمت:{spacePrice(item.price)}</Text>
                        <View style={{ top: 12, flexDirection: 'row', alignSelf: 'flex-end' }} >
                          {item.meanStar >= 5 && <Icon4 name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar > 4 && item.meanStar < 5 && <Icon4 name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar >= 4 && <Icon4 name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar > 3 && item.meanStar < 4 && <Icon4 name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar >= 3 && <Icon4 name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar > 2 && item.meanStar < 3 && <Icon4 name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar >= 2 && <Icon4 name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar > 1 && item.meanStar < 2 && <Icon4 name='star-half' size={p.width < 360 ? 13 : 16} color='orange' />}
                          {item.meanStar >= 1 && <Icon4 name='star' size={p.width < 360 ? 13 : 16} color='orange' />}
                        </View>
                      </View>
                      <View style={[styles.TextPlus, { marginTop: -2 }]} >
                        {
                          item.available ?
                            <Pressable
                              dir='rtl'
                              onResponderStart={(e) => {


                                hidden = animScale.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [450, e.nativeEvent.pageY - 177]
                                })

                                hidden2 = animScale.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: 
                                  numColumns2 == 1 && [180, e.nativeEvent.pageX - 100] ||
                                  numColumns2 == 2 && [300, e.nativeEvent.pageX - 100] ||
                                  numColumns2 == 3 && [550, e.nativeEvent.pageX - 100] ||
                                  numColumns2 == 4 && [650, e.nativeEvent.pageX - 100]
                                  
                                })

                                console.log(e.nativeEvent.pageY, e.nativeEvent.pageX);
                              }}

                              style={[styles.viewIcons, { top: -3, height: '100%', width: 25, alignItems: 'center' }]}>
                              <Icon

                                size={20} name="plus" style={{ paddingTop: 3 }} onPress={() => {
                                  open()
                                  setitem(item)
                                  plus(index, item)
                                  startScale()
                                }}
                                color='blue' />
                              <Icon size={20} name="minus" style={{ paddingTop: 10 }} onPress={() => {
                                p.current[index].num > 0 &&
                                  minus(index, item)
                              }
                              } color='red' />
                            </Pressable>
                            :
                            <Text />
                        }
                        <View style={[styles.vpls, { maxWidth: 40 }]} >
                          {
                            item.available ?
                              <>
                                <Text onPress={() => {
                                  p.current[index].num == 0 &&
                                    plus(index, item)
                                }
                                } style={{ top: -6, fontSize: p.width < 360 ? 10.5 : 13, }}>افزودن</Text>
                                <Text children={p.allprice ? p.current[index] && p.current[index].num.toString() + " " + 'عدد' : '0 ' + 'عدد'}
                                  style={{ marginTop: 3, fontSize: p.width < 360 ? 10.5 : 13, }} />
                              </>
                              :
                              <Text style={{ color: 'red', borderWidth: 1, borderColor: 'red', marginTop: 10, width: 50, textAlign: 'center', borderColor: 'red', padding: 3, transform: [{ rotate: '-20deg' }], fontSize: p.width < 360 ? 10.5 : 13 }}>ناموجود</Text>
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </>)} />
        }
      </View >
      <Animated.View style={{ height: '7%', minHeight: 50, position: 'absolute', bottom: anim , alignItems: 'center', alignSelf: 'center' }} >
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
          />
        }
      </Animated.View>


      {item2.title && item2.title != item3.title && <Animated.View style={[{ height: 200, width: 200, transform: [{ scale: animScale }], position: 'absolute', borderRadius: 11, borderWidth: 15, borderColor: 'silver', zIndex: 100, top: hidden, left: hidden2 }]} >
        <ImageBackground style={[styles.img]} source={{ uri: `${localhost}/upload/food/${item2.imageUrl}` }}>

        </ImageBackground>
      </Animated.View>}


      <Animated.View
        onStartShouldSetResponder={() => { p.navigation.navigate(p.tokenValue.fullname ? "FinallFoodPayment" : "Login", { name: 'ChildFood', price: inputPrice }) }}
        style={[styles.buttomPayment, { height: anim, }]}>
        <Image style={[styles.imagePayment]} source={require('../../assets/images/a13.jpg')} />
        <View style={styles.ViewPayment}>
          <Text style={styles.titleSubTitle} >مشاهده ی سبد و پرداخت</Text>
          <View style={styles.containSubPrice}>
            <Text style={styles.textPayment}>قیمت کل :</Text>
            <Text style={[styles.smalPrice, { marginTop: 12 }]} >{spacePrice(inputPrice)} تومان</Text>
          </View>
        </View>
      </Animated.View>
    </View >
  )
}

export default ChildFood