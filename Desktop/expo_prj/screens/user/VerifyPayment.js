import React from 'react'
import { View, Text } from 'react-native'

const VerifyPayment = (p) => {

	return (
		<View style={{ width: '100%', height: '100%' }} >
			<Text style={{ color: '#0c0', fontSize: 27, alignSelf: 'center', fontWeight: 'bold', marginTop:25, backgroundColor:'#fff', paddingVertical:10,width:'90%',textAlign:'center',borderRadius:4 }} >پرداخت موفق</Text>
			{p.route.params.qualification === 'ok' ?
				<View style={{ alignSelf: 'center', marginTop: 25, shadowOpacity: .4, width: '90%', shadowRadius: 5, backgroundColor: '#fff', borderWidth: 1, borderColor: 'silver', borderRadius: 7, padding: 15, alignItems: 'center' }} >
					<Text style={{ fontSize: 20, alignSelf: 'center', color:'#444' }} >فیش شما با مشخصات زیر صادر شد</Text>
					
					<View style={{ alignSelf: 'center', borderWidth: .3, borderColor: '#888', width: '100%', marginVertical: 15, paddingHorizontal: 15, paddingTop: 15, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
						<View style={{ borderBottomWidth: .2, borderColor: '#888', paddingBottom: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }} >
							<Text ><Text style={[{ fontWeight: 'bold', textAlign: 'left', }]} >نام: </Text>{p.route.params.fullname}</Text>
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ fontWeight: 'bold', textAlign: 'left' }} >شماره تلفن: </Text>
								<Text  >{p.route.params.phone}</Text>
							</View>
						</View>

						<View style={{ borderBottomWidth: .2, borderColor: '#888', padding: 15, width: '100%' }} >
							<Text  ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >آدرس: </Text>{p.route.params.formattedAddress?.split(",")[0] + p.route.params.formattedAddress?.split(",")[1]} , {p.route.params.streetName}</Text>
						</View>
						<View style={{ borderBottomWidth: .2, borderColor: '#888', paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
							<Text  ><Text style={{ fontWeight: 'bold' }} >پلاک: </Text>{p.route.params.floor}</Text>
							<Text  ><Text style={{ fontWeight: 'bold' }} >طبقه: </Text>{p.route.params.plaque}</Text>
						</View>
						<View style={{ paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
							<Text  ><Text style={{ fontWeight: 'bold' }} >قیمت: </Text>{p.spacePrice(p.route.params.price)} تومان</Text>
							<Text style={{ color: '#ababab', }}>{p.moment(JSON.parse(p.route.params.createdAt)).format('jYYYY/jM/jD hh:mm:ss')}</Text>
						</View>
					</View>

				</View>
				:
				<View>
					<Text style={{ color: 'red', fontSize: 30, margin: 'auto', marginTop: 40 }} >خطا پرداخت انجام نشد</Text>
				</View>
			}
		</View>
	)
}

export default VerifyPayment