import localStorage from "@react-native-async-storage/async-storage"
import Axios from 'axios'
import { create, close } from '../notification'
export const localhost1 = "http://192.168.42.42"
export const localhost = "http://localhost"
const toast500 = () => { create('مشکلی از سمت سرور پیش آمده', '', '', () => { }); setTimeout(() => { close() }, 2000); }
const toast400 = () => { create('خطا دوباره امتحان کنید', '', '', () => { }); setTimeout(() => { close() }, 2000); }
const toast399 = () => { create('کد وارد شده اشتباه هست', '', '', () => { }); setTimeout(() => { close() }, 2000); }
const toast398 = () => { create('شما قبلا ثبت نام کردید', '', '', () => { }); setTimeout(() => { close() }, 2000); }
const toast397 = () => { create('خطا شماره یا پسورد را اشتباه وارد کردید', '', '', () => { }); setTimeout(() => { close() }, 2000); }

Axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
const setToken = (async () => { const token = await localStorage.getItem("token"); if (token) Axios.defaults.headers.common["Authorization"] = token; })()
Axios.interceptors.response.use(function (response) {
   return response;
}, function (error) {
   if (error?.response?.status) {
      if (error.response.status > 400 && error.response.status <= 500) {toast500()};
      if (error.response.status === 400) {alert()};
      if (error.response.status === 399) {alert()};
      if (error.response.status === 398) {alert()};
      if (error.response.status === 397) { alert() };
   } return Promise.reject(error);
});


function _axios() {
   (async () => {
      const ok = 200 || 201
      this.get = async (url) => { let response = await Axios.get(url); return { data: response.status === ok ? response.data : {}, status: response.status } }
      this.post = async (url, data) => { const dt = new FormData(); for (let i in data) { dt.append(String(i), data[i]) }; let response = await Axios.post(url, dt); return { data: response.status === ok ? response.data : {}, status: response.status } }
      this.put = async (url, data) => { const dt = new FormData(); for (let i in data) { dt.append(String(i), data[i]) }; let response = await Axios.put(url, dt); return { data: response.status === ok ? response.data : {}, status: response.status } }
      this.delete = async (url) => { try { let response = await Axios.delete(url); return { data: response.status === ok ? response.data : {}, status: response.status } } catch (err) { console.log(err) } }
   })()
}
export const axios = new _axios()