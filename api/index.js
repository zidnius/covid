import axios from 'axios'

const myApi = axios.create({
  baseURL: 'https://kipi.covid19.go.id/api'
})

myApi.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log('error axios!')
    return Promise.reject(error)
  }
)

export default myApi
