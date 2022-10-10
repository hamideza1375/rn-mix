import React from 'react'
import { View, Text, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, P, Table } from '../../Components/Html';
import Loading from '../../Components/Loading'
import styles from "./styles/Food.js"
import {localhost} from '../../utils/axios/axios'
import spacePrice from '../../utils/spacePrice';

const FinallFoodPayment = (p) => {
  const inputPrice = `${p.allprice ? p.allprice : '0'}`
  const allfood = p.allfood.filter((a) => a.num > 0)
  p._food.allPrice()
  const plus = (index, item) => p._food.plustNum(index, item)
  const minus = (index, item) => p._food.minusNum(index, item)
  const deleteAsyncStorage = () => p._food.deleteStorage()


  return (
        <View style={styles.viewHead}>
          <View style={styles.viewOne}>
            <View style={styles.viewConseal} >
              <Button disabled={allfood.length ? false : true} bgcolor="yellow" style={styles.btnFinal} onPress={deleteAsyncStorage} >لغو سفارش</Button>
            </View>
            <View style={{ width: '96%', alignSelf: 'center', height:'calc(100vh - 190px)' }} >
              {!allfood.length ?
                <Loading time={500} color={'red'} animating={allfood.length ? false : true} />
                :
                <ScrollView style={styles.scrollTable} contentContainerStyle={{ flexGrow: 1, paddingBottom: 55 }} >
                  <Table
                    color={['#555', '#656565', 'white']}
                    fontSize={14}
                    header={['جمع', 'عنوان']}
                    body={['total', 'title']}
                    object={allfood}
                  />
                  <View style={{}}>
                    <P fontSize={13.5} border={[.5]} style={{ height: 33, flex: 1, textAlign: 'center', alignSelf: 'center', width: '99%' }} >قیمت کل: </P>
                    <P fontSize={13.5} border={[.5]} style={{ height: 33, flex: 1, textAlign: 'center', alignSelf: 'center', width: '99%' }} >{spacePrice(inputPrice, null)} ت</P>
                  </View>
                </ScrollView>
              }
            </View>
          </View>
          <View style={styles.viewPayment}>
            <View style={styles.viewPayTwo}>
              <Button disabled={allfood.length ? false : true} bgcolor="yellow"
                style={styles.btnFinal}
                onPress={() => { p.navigation.navigate("Location") }}
              >
                پرداخت
              </Button>
            </View>
            <View style={{ height:'calc(100vh - 150px)', paddingLeft: 14 }}>
              {!allfood.length ?
                <Loading time={500} color={'red'} animating={allfood.length ? false : true} />
                :
                <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 45}]} >
                  {allfood.map((item, index) => (
                    <View key={item._id} style={[styles.viewKey]}>
                      <ImageBackground style={[styles.imageFinalFood]} source={{ uri: `${localhost}/upload/food/${item.imageUrl}` }} >
                        <Text style={[styles.textTitleFinal]}>{item.title}</Text>
                      </ImageBackground>
                      <View style={[styles.containButtomImage]} >
                        <View style={[styles.viewPlusMinus]}>
                          <Icon style={{ padding: 6 }} size={19} name="plus" onPress={() => plus(index, item)} color='blue' />
                          <View style={{ paddingVertical: 4 }} />
                          <Icon style={{ padding: 6 }} size={19} name="minus" color='red' onPress={() => item.num > 0 && minus(index, item)} />
                        </View>
                        <View style={[styles.viewInputNum]} >
                          <Text style={[ { padding: 3 }]} children={allfood[index].num.toString()} />
                        </View>
                        <View style={[styles.textPrice]}>
                          <Text style={{ textAlign: 'right', width:80, }} >قیمت:</Text>
                          <Text style={{ textAlign: 'right',fontSize: 13,width:80 }} >{spacePrice(item.price, null)} <Text style={{ fontSize: 12 }}>ت</Text></Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              }
            </View>
            <View>
            </View>
          </View>
        </View >
  )
}
export default FinallFoodPayment
