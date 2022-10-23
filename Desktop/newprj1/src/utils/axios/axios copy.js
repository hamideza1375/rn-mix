import localStorage from "@react-native-async-storage/async-storage"
import _toast from "../../Components/Toast"
import Axios from 'axios'
export const localhost = "http://192.168.42.42"
export const localhost1 = "http://localhost"
const toast500 = () => { _toast('مشکلی از سمت سرور پیش آمده') }
const toast400 = () => { _toast('خطا دوباره امتحان کنید') }
const toast399 = () => { _toast('کد وارد شده اشتباه هست') }
const toast398 = () => { _toast('شما قبلا ثبت نام کردید') }
const toast397 = () => { _toast('خطا شماره یا پسورد را اشتباه وارد کردید') }

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
   let [resource, config] = args;
   let response = await originalFetch(resource, config);
   if (response.ok || response.status === 200 || response.status === 201) return response
   else {if (response.status === 399) toast399();if (response.status === 398) toast398();if (response.status === 397) toast397();if (response.status === 400) toast400();if (response.status > 400) toast500();}
   return Promise.reject();
};

Axios.defaults.headers.post["Content-Type"] = "application/json";
const sum = (async () => { const token = await localStorage.getItem("token"); if (token) Axios.defaults.headers.common["Authorization"] = token; })()
Axios.interceptors.response.use(null, error => { if (error.response && error.response.status > 400 && error.response.status <= 500) { toast500() }; if (error.response.status === 400) { toast400() }; if (error.response.status === 399) { toast399() }; if (error.response.status === 398) { toast398() }; if (error.response.status === 397) { toast397() }; return Promise.reject(error); });

// function _axios() {
//    (async () => {
//       this.get = async (url) => { let response = await Axios.get(url); return { data: response.data, status: response.status } }
//       this.post = async (url, data) => { if (!data['_parts']) { const dt = new FormData(); for (let i in data) { dt.append(String(i), data[i]) }; let response = await Axios.post(url, dt); return { data: response.data, status: response.status } } else { let response = await Axios.post(url, data); return { data: response.data, status: response.status } } }
//       this.put = async (url, data) => { try { if (!data['_parts']) { ; const dt = new FormData(); for (let i in data) { dt.append(String(i), data[i]) }; let response = await Axios.put(url, dt); return { data: response.data, status: response.status } } else { let response = await Axios.put(url, data); return { data: response.data, status: response.status } } } catch (err) { console.log(err) } }
//       this.delete = async (url) => { try { let response = await Axios.delete(url); return { data: response.data, status: response.status } } catch (err) { console.log(err) } }
//    })()
// }
// export const axios = new _axios()

// fetch
function _axios() {
   (async () => {
      let token = await localStorage.getItem("token"); let hdr = { Accept: 'application/json', 'Content-Type': 'application/json' }; if (token) hdr["Authorization"] = token
      this.get = async (url) => {let response = await fetch(url, { headers: hdr });return { data: await response.json(), status: response.status }}
      this.post = async (url, data) => {if (!data['_parts']) {const dt = new FormData(); for (let i in data) { dt.append(String(i), data[i]) };let response = await fetch(url, { method: 'post', body: dt, headers: hdr });return { data: await response.json(), status: response.status }}else {let response = await fetch(url, { method: 'post', body: data, headers: hdr });return { data: await response.json(), status: response.status }}}
      this.put = async (url, data) => {if (!data['_parts']) {const dt = new FormData(); for (let i in data) {dt.append(String(i), data[i])};let response = await fetch(url, { method: 'put', body: dt, headers: hdr });return { data: await response.json(), status: response.status }}else {let response = await fetch(url, { method: 'put', body: data, headers: hdr });return { data: response.data, status: response.status }}}
      this.delete = async (url, body) => {let response = await fetch(url, { method: 'delete', headers: hdr, body });return { data: await response.json(), status: response.status }}
   })()
}

export const axios = new _axios()
