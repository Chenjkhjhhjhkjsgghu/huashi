import axios from 'axios'
// http response 拦截器
axios.interceptors.response.use(function (response) {
  return response.data
}, function (response) {
})
