import React from 'react'
import { Text, View, FlatList } from 'react-native';
import { Button, Input } from '../../Components/Html';
import spacePrice from '../../utils/spacePrice';

const Address = (p) => {
  p._admin.getAllAddress()
  const deleteAddress = (_id) => p._admin.deleteAddress(_id)

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#eee' }} >
      <Input w={'95%'} alignSelf={'center'} value={p.textSearch} onChangeText={(text) => { p.settextSearch(text); const fd = p._address.filter(f => f.fullname.includes(text)); p.setallAddress(fd) }} p="جستجو غذا و نوشیدنی" icon={'search'} />
      {
        p.allAddress?.length ?
          <FlatList
            initialNumToRender={3}
            keyExtractor={(f) => f && f._id.toString()}
            data={p.allAddress}
            contentContainerStyle={{ paddingBottom: 55, }}
            renderItem={({ item, index }) => (
              item.del !== p.tokenValue.userId &&
              <View key={item._id} style={{
                alignSelf: 'center',
                borderWidth: .3,
                width: '90%',
                marginVertical: 15,
                padding: 15,
                backgroundColor: '#f5f5f5',
                borderRadius: 4
              }}>
                <View style={{ borderBottomWidth: .2, paddingBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }} >
                  <Text style={{ textDecorationLine: p.addressMap.get(item._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(item._id) ? '#aaa' : 'black' }}><Text style={[{
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }]} >نام: </Text>{item.fullname}</Text>
                  <View flexDirection={'row'} ><Text style={{ fontWeight: 'bold', textAlign: 'left', textDecorationLine: p.addressMap.get(item._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(item._id) ? '#aaa' : 'black', }} >شماره تلفن: </Text>
                  </View>
                </View>
                <View style={{ borderBottomWidth: .2, padding: 15, width: '100%' }} >
                  <Text  ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >آدرس: </Text>{item.formattedAddress?.split(",")[0] + item.formattedAddress?.split(",")[1]} , {item.streetName}</Text>
                </View>
                <View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
                  <Text style={{ textDecorationLine: p.addressMap.get(item._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(item._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >پلاک: </Text>{item.floor}</Text>
                  <Text style={{ textDecorationLine: p.addressMap.get(item._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(item._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >طبقه: </Text>{item.plaque}</Text>
                  <Text style={{ textDecorationLine: p.addressMap.get(item._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(item._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >شماره: </Text>{item.id}</Text>
                </View>
                <View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
                  <Text style={{ textDecorationLine: p.addressMap.get(item._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(item._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >قیمت: </Text>{spacePrice(item.price)}</Text>
                  <Text style={{ color: '#ababab', }}>{item.createdAt.split("T")[1].split(".")[0]}</Text>
                </View>
                <View style={{ paddingTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-around', }} >
                  <Button outline bgcolor='blue' style={{ backgroundColor: '#f7f7f7', height: 30 }}
                    onPress={() => p.navigation.navigate('Location', { origin: item.origin })} >نمایش</Button>
                  <Button outline bgcolor={!p.addressMap.get(item._id) ? 'green' : 'orange'} style={{ backgroundColor: '#f7f7f7', height: 30 }} onPress={() => { !p.addressMap.get(item._id) ? p.addressMap.set(item._id, item._id) : p.addressMap.delete(item._id); p.setchange(!p.change); }} > {!p.addressMap.get(item._id) ? 'خانده شده ' : 'خانده نشده'}</Button>
                  <Button outline bgcolor='red' style={{ backgroundColor: '#f7f7f7', height: 30 }} onPress={() => deleteAddress(item._id)} >حذف</Button>
                </View>
              </View>
            )} />
          : <></>
      }
    </View>
  )
}

export default Address