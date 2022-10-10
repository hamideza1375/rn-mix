import React, { useEffect } from 'react'
import { localhost } from '../../utils/axios/axios'
import { Helmet } from "react-helmet";
import axios from 'axios'
import { styles } from './leaflet/styles';

let revers = {}
const Location = (p) => {

	useEffect(() => {
		require('./leaflet/leaflet')

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
					setTimeout(() => { marker.bindPopup(street).openPopup() }, 1500)
				}
			}
		})()

		marker.on('dragend', async (ev) => {
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
				}
				else marker.bindPopup('!پیدا نشد ').openPopup()
			}
		}

		document.getElementById('searching').onclick = () => searching()

		document.getElementById('formSearch').onsubmit = (event) => searching(event)

		document.getElementById('btnGetLocation').onclick = () => {
				function onLocationError(e) {alert(e.message);}
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

		document.getElementById('btnPayment').onclick = async () => {
				if (!document.getElementById('plaque').value || !document.getElementById('floor').value) alert('کادر پلاک و طبقه را پر کنید')
				let { data, status } = await axios.post(`${localhost}/confirmpayment?allprice=${p.allprice}`, {
					foods: p.totalTitle,
					plaque: document.getElementById('plaque').value,
					floor: document.getElementById('floor').value,
					formattedAddress: JSON.stringify(revers.formattedAddress),
					streetName: JSON.stringify(revers.streetName),
					origin: JSON.stringify(revers)
				})
				if (status === 200) window.location.assign(data)
			}
	}, [])

	return (
		<div style={{ minWidth: '100%', minHeight: '100%' }}>
			<Helmet>
				<style type="text/css">{styles}</style>
			</Helmet>
			<div style={{ display: p.route.params?.origin ? 'none' : 'flex', position: 'absolute', justifyContent: 'flex-end', height: 'auto', zIndex: 11111, top: 1 }}>
				<form id="formSearch"
					style={{ width: 200, margin: ' 3px 2px 0 0', display: 'flex', flexDirection: 'row', alignItems: ' flex-end', }}>
					<input type="text" placeholder="search" id='inputSearch'
						style={{ textAlign: 'right', borderRadius: '1px', border: '1px solid rgb(150, 146, 146)', display: 'block', flexGrow: 1, height: 25, position: 'relative', zIndex: 1000 }} />
					<i className="fa fa-search" id='searching' style={{ cursor: 'pointer' , borderRadius: 1, padding: '1px 2px 3px', border: '1px solid rgb(150, 146, 146)', backgroundColor: '#fff', fontSize: 18, display: 'block', height: 23.2, width: 20, position: 'relative', zIndex: 1000 }}>🔎</i>
				</form>
			</div>
			<button id='btnGetLocation' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#fff', padding: '1px 1px 2px', borderRadius: '4px', zIndex: 10000, position: 'absolute', top: 66, left: 9.88, fontSize: 20, height: 30, maxHeight: 30, width: 26.62, maxWidth: 26.62, borderWidth: 0, boxShadow: '.2px 1.5px 4px #333d' }}><p style={{ transform: 'rotate(-65deg)', padding: 0, margin: 0, marginTop: -2 }}>⌲</p></button>
			<div id="map" style={{ minWidth: '100%', minHeight: '90%', display: 'flex', flex: 1, height: window.innerHeight - 75, width: window.innerWidth }}></div>
			<div id='bottomDiv' style={{ visibility: p.route.params?.origin ? 'hidden' : 'visible', zIndex: 10000, position: 'absolute', bottom: 0, display: 'flex', justifyContent: 'space-around', width: '100%', background: '#fff', padding: '8px 0 10px', flexDirection: 'row'}}>
				<span style={{ display: 'flex', flexDirection: 'row-reverse' }}> <input type='number' style={{ textAlign: 'center', width: '45px', height: '40px' }} id='plaque' /><p style={{ margin: '7px 5px' }} >پلاک:</p> </span>
				<span style={{ display: 'flex', flexDirection: 'row-reverse' }} > <input type='number' style={{ textAlign: 'center', width: '45px', height: '40px' }} id='floor' /><p style={{ margin: '7px 5px' }} >طبقه:</p></span>
				<button id='btnPayment' style={{ border: '1px solid #3af', right: '2px', background: "#3afa", height: '42px', width: '75px', fontSize: '15px', borderRadius: '5px', color: '#444' }} >پرداخت</button>
			</div>
		</div>
	);
}

export default Location;