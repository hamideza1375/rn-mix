import React, { useState } from 'react'
import { Text, View, FlatList } from 'react-native';
import { Button } from '../../Components/Html';
import moment from "moment-jalaali";
import spacePrice from '../../utils/spacePrice';

const DeleteAllAddress = (p) => {

	const [show, setshow] = useState(false)
	p._admin.getAllAddress()
	p._admin.totalAllAddress()
	const deleteAllAddress = () => p._admin.deleteAllAddress()

	return (
		<View style={{ flex: 1, width: '100%', backgroundColor: '#eee' }} >
			{p.allAddress.length ? <Button bgcolor='red' onPress={() => deleteAllAddress()} >حذف همه</Button> : <></>}

			{show && <Button outline bgcolor='silver' onPress={() => { setshow(!show) }} >جمع ماه گذشته از {p.oldPrice?.split("=") && p.oldPrice.split("=")[0]} = {p.oldPrice?.split("=") && spacePrice(p.oldPrice.split("=")[1])} تومان</Button>}
			<Button outline bgcolor='black' onPress={() => { setshow(!show) }} > جمع از تاریخ {p.fromMomemt} = {spacePrice(p.totalPrices)} تومان</Button>

			{
				p.allAddress?.length ?

					<FlatList
						initialNumToRender={3}
						keyExtractor={(f) => f && f._id.toString()}
						data={p.allAddress}
						contentContainerStyle={{ paddingBottom: 55, }}
						renderItem={({ item, index }) => (
							<View key={item._id} style={{
								alignSelf: 'center',
								borderWidth: .3,
								width: '90%',
								marginVertical: 15,
								paddingHorizontal: 15,
								paddingTop: 16,
								backgroundColor: '#f5f5f5',
								borderRadius: 4
							}}>
								<View style={{ borderBottomWidth: .2, paddingBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }} >
									<Text ><Text style={[{
										fontWeight: 'bold',
										textAlign: 'left',
									}]} >نام: </Text>{item.fullname}</Text>
									<View flexDirection={'row'} ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >شماره تلفن: </Text><Text  >{item.phone}</Text></View>
								</View>
								<View style={{ borderBottomWidth: .2, padding: 15, width: '100%' }} >
									<Text  ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >آدرس: </Text>{item.formattedAddress?.split(",")[0] + item.formattedAddress?.split(",")[1]} , {item.streetName}</Text>
								</View>
								<View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
									<Text  ><Text style={{ fontWeight: 'bold' }} >پلاک: </Text>{item.floor}</Text>
									<Text  ><Text style={{ fontWeight: 'bold' }} >طبقه: </Text>{item.plaque}</Text>
									<Text  ><Text style={{ fontWeight: 'bold' }} >شماره: </Text>{item.id}</Text>
								</View>
								<View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
									{/*  moment(address.createdAt).format('jYYYY/jM/jD')) */}
									<Text  ><Text style={{ fontWeight: 'bold' }} >قیمت: </Text>{spacePrice(item.price)}</Text>
									<Text style={{ color: '#ababab', }}>{moment(item.createdAt).format('jM/jD HH:mm')}</Text>
								</View>
							</View>
						)} />
					: <></>
			}
		</View>
	)
}

export default DeleteAllAddress