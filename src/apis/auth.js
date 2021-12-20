import request from '../helpers/request'



//接口封装成API，调用时语义更清晰，方便后期维护管理
const URL = {
  REGISTER:'/auth/register',
  LOGIN:'/auth/login',
  LOGOUT:'/auth/logout',
  GET_INFO:'/auth'
}

export default {
  register({username,password}) {
    return request(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}) {
    return request(URL.LOGIN,'POST',{username,password})
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo() {
    return request(URL.GET_INFO)
  }
}
