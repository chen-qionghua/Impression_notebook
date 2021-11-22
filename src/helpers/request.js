//引入axios；封装统一接口，无论get还是post调用；有一个统一的入口对请求进行管理
import axios from 'axios'
import baseURLConfig from './config-baseURL'
//自定义配置通用的请求信息
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL

axios.defaults.withCredentials = true;  //支持跨域请求为true，让发送请求携带cookie

export default function request(url,type = 'GET', data = {}) {
  return new Promise((resolve,reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >=200 && status <300) || status ===400
      }
    }
    if(type.toLowerCase() ==='get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      if(res.status ===200) {
        resolve(res.data)
      }else {
        console.error(res.data)
        reject(res.data)
      }
    }).catch(err => {
      console.error({msg:'网络异常'})
      reject({msg:'网络异常'})
    })
  })
}
