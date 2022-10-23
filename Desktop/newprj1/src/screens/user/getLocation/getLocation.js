import GetLocation from "react-native-get-location";
export const getLocation =(p)=>{
    p.useEffects(() => {
        GetLocation.getCurrentPosition({enableHighAccuracy: false,timeout: 15000,})
        .then(location => {p.setregion({lat: location.latitude,lng: location.longitude,})})
        .catch(error => {const { code, message } = error; console.warn(code, message);})
   }, [])
}