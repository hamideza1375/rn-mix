import React, { useEffect } from 'react'
import { localhost } from '../../utils/axios/axios'
import axios from 'axios'
import { styles } from '../../_other/leaflet/styles';

let revers = {}
const Location = (p) => {

	useEffect(() => {
		require('../../_other/leaflet/leaflet')

		const origin = p.route.params?.origin

		let mark = origin ? { lat: origin.latitude, lng: origin.longitude } : { lat: 36.214174234928924, lng: 57.68491965736432 }

		var map = L.map('map', { center: mark, zoom: 15, })

		var myIcon = L.icon({ iconUrl: `${localhost}/images/mark.png`, iconSize: [38, 95], iconAnchor: [22, 94], popupAnchor: [-3, -76], shadowSize: [68, 95], shadowAnchor: [22, 94], });
		let markerOption = { draggable: origin ? false : true, icon: myIcon }

		let marker = L.marker(mark, markerOption).addTo(map)

		map.on('click', (ev) => { marker.openPopup() })

		var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
		map.addLayer(layer);

		(async () => {
			const response = await axios.post(`${localhost}/reverse`, JSON.stringify(mark), { headers: { 'Content-Type': 'application/json' } })
			if (response.status) {
				const data = await response.data
				if (data[0]) {
					const one = (data[0].streetName && data[0].streetName !== data[0].formattedAddress.split(",")[0]) ? data[0].streetName : ''
					const two = data[0].formattedAddress.split(",")[0] ? data[0].formattedAddress.split(",")[0] : ''
					const three = data[0].formattedAddress.split(",")[1] ? data[0].formattedAddress.split(",")[1] : ''
					const street = one + ' ' + two + ' ' + three
					revers = data[0]
					marker.bindPopup(street).openPopup()
					document.getElementById('address').innerHTML = street
					setTimeout(() => { marker.bindPopup(street).openPopup() }, 500)
				}
			}
		})()

		marker.on('dragstart', async (ev) => {
			document.getElementById('bottomDiv').style.visibility = 'hidden'
		})

		marker.on('dragend', async (ev) => {

			document.getElementById('bottomDiv').style.visibility = 'visible'

			map.setView({ lat: ev.target._latlng.lat, lng: ev.target._latlng.lng })
			const response = await axios.post(`${localhost}/reverse`, JSON.stringify({ lat: ev.target._latlng.lat, lng: ev.target._latlng.lng }), { headers: { 'Content-Type': 'application/json' } })
			if (response.status) {
				const data = await response.data
				if (data[0]) {
					const one = (data[0].streetName && data[0].streetName !== data[0].formattedAddress.split(",")[0]) ? data[0].streetName : ''
					const two = data[0].formattedAddress.split(",")[0] ? data[0].formattedAddress.split(",")[0] : ''
					const three = data[0].formattedAddress.split(",")[1] ?
						data[0].formattedAddress.split(",")[1] : ''
					revers = data[0]
					const street = one + ' ' + two + ' ' + three
					marker.bindPopup(street).openPopup()
					document.getElementById('address').innerHTML = street
				}
			}
		});

		const searching = async (event) => {
			if (event) event.preventDefault()
			const response = await fetch(`${localhost}/geocode`, { method: 'post', body: JSON.stringify({ loc: 'سبزوار' + ' ' + document.getElementById('inputSearch').value }), headers: { 'Content-Type': 'application/json' } })
			if (response.status) {
				const data = await response.json()
				if (data[0]) {
					const one = (data[0].streetName && data[0].streetName !== data[0].formattedAddress.split(",")[0]) ? data[0].streetName : ''
					const two = data[0].formattedAddress.split(",")[0] ? data[0].formattedAddress.split(",")[0] : ''
					const three = data[0].formattedAddress.split(",")[1] ?
						data[0].formattedAddress.split(",")[1] : ''
					revers = data[0]
					const street = one + ' ' + two + ' ' + three
					map.setView({ lat: data[0].latitude, lng: data[0].longitude });
					marker.setLatLng({ lat: data[0].latitude, lng: data[0].longitude })
					marker.bindPopup(street.trim() ? street : '!پیدا نشد').openPopup()
					document.getElementById('address').innerHTML = street
				}
				else {
					marker.bindPopup('!پیدا نشد ').openPopup()
					document.getElementById('address').innerHTML = street
				}
			}
		}

		document.getElementById('searching').onclick = () => searching()

		document.getElementById('formSearch').onsubmit = (event) => searching(event)

		document.getElementById('btnPayment').onclick = async () => {
			if (!document.getElementById('plaque').value || !document.getElementById('floor').value) alert('کادر پلاک و طبقه را پر کنید')
			let { data, status } = await axios.post(`${localhost}/confirmpayment?allprice=${p.route.params.allprice}`, {
				foods: p.totalTitle,
				plaque: document.getElementById('plaque').value,
				floor: document.getElementById('floor').value,
				formattedAddress: JSON.stringify(revers.formattedAddress),
				streetName: JSON.stringify(revers.streetName),
				origin: JSON.stringify(revers)
			})
			if (status === 200) window.open(data)
			// if (status === 200) p.navigation.replace('Payment', { url: data })
		}


		document.getElementById('btnGetLocation').onclick = () => {
			function onLocationError(e) { alert(e.message); }
			function onLocationFound(e) {
				var radius = e.accuracy / 2;
				L.marker(e.latlng).addTo(map)
					.bindPopup("You are within " + radius + " meters from this point").openPopup();
				L.circle(e.latlng, radius).addTo(map);
			}
			map.on('locationfound', onLocationFound);
			map.on('locationerror', onLocationError);
			map.locate({ watch: true, setView: true })
		}


		//!style
		const mapStyle = document.createElement('style');
		mapStyle.appendChild(document.createTextNode(styles));
		document.head.appendChild(mapStyle);


	}, [])

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div style={{ display: p.route.params?.origin ? 'none' : 'flex', position: 'absolute', justifyContent: 'flex-end', height: 'auto', zIndex: 11111, top: 1 }}>
				<form id="formSearch"
					style={{ width: 200, margin: ' 3px 2px 0 0', display: 'flex', flexDirection: 'row', alignItems: ' flex-end', }}>
					<input type="text" placeholder="search" id='inputSearch'
						style={{ textAlign: 'right', borderRadius: '1px', border: '1px solid rgb(150, 146, 146)', display: 'block', flexGrow: 1, height: 25, position: 'relative', zIndex: 1000 }} />
					<i className="fa fa-search" id='searching' style={{ cursor: 'pointer', borderRadius: 1, paddingBottom: 1,paddingRight:2, border: '1px solid rgb(150, 146, 146)', backgroundColor: '#fff', fontSize: 15, display: 'block', height: 25, width: 24, position: 'relative', zIndex: 1000,boxSizing:'border-box' }}>🔎</i>
				</form>
			</div>
			<button id='btnGetLocation' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#fff', padding: '1px 1px 2px', borderRadius: '4px', zIndex: 10000, position: 'absolute', top: 66, left: 9.88, fontSize: 20, height: 30, maxHeight: 30, width: 26.62, maxWidth: 26.62, borderWidth: 0, boxShadow: '.2px 1.5px 4px #333d' }}><p style={{ transform: 'rotate(-65deg)', padding: 0, margin: 0, marginTop: -2 }}>⌲</p></button>
			<div id="map" style={{ width: '100%', height: 'calc(99vh)', }}></div>

			<div id='bottomDiv' style={{ visibility: p.route.params?.origin ? 'hidden' : 'visible', zIndex: 10000, position: 'absolute', bottom: 0, width: '100%', background: '#fff', padding: '15px', boxSizing:'border-box' }}>
				<div id='bottomDiv2' style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', background: '#fff', padding: '8px 0 8px', flexDirection: 'row' }}>
					<span style={{ display: 'flex', flexDirection: 'row-reverse' }}> <input type='number' style={{ textAlign: 'center', width: '45px', height: '35px', border: '.2px solid #999', borderRadius: 3 }} id='plaque' /><p style={{ margin: '7px 5px' }} >پلاک:</p> </span>
					<span style={{ display: 'flex', flexDirection: 'row-reverse' }} > <input type='number' style={{ textAlign: 'center', width: '45px', height: '35px', border: '.2px solid #999', borderRadius: 3 }} id='floor' /><p style={{ margin: '7px 5px' }} >طبقه:</p></span>
					<button id='btnPayment' style={{ display: 'block', marginTop:-3,marginRight: 12, border: '1px solid #3af', background: "#3afa", height: '42px', width: '75px', fontSize: '15px', borderRadius: '5px', color: '#444', }} >پرداخت</button>
				</div>
				<span style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%', justifyContent: 'flex-end' }} ><p id='address' style={{ margin: '9px 0px' }}></p><p style={{ margin: '7px 5px' }} >ادرس:</p></span>
			</div>
		</div>
	);
}

export default Location;