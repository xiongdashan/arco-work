/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import Axios, {
  AxiosResponse
} from 'axios'

export const baseURL =
  import.meta.env.DEV ? 'http://192.168.31.124:9999/' : ''

export const CONTENT_TYPE = 'Content-Type'

export const FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'

export const APPLICATION_JSON = 'application/json; charset=UTF-8'

export const TEXT_PLAIN = 'text/plain; charset=UTF-8'

const service = Axios.create({
  baseURL,
  timeout: 10 * 60 * 1000,
  // withCredentials: true, // 跨域请求时发送cookie
})

service.interceptors.request.use(
  (config) => {
    !config.headers && (config.headers = {})
    config.headers[CONTENT_TYPE] = APPLICATION_JSON
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) {
      return response
    } 
      throw new Error(response.status.toString())
    
  },
  (error) => {
    if (
      import.meta.env.MODE === 'development') {
      console.log(error)
    }
    return Promise.reject(error)
  }
)

export default service