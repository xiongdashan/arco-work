/* eslint-disable prettier/prettier */
import { getTid, getToken } from '@/utils/auth'
import { AxiosRequestHeaders, AxiosResponse } from 'axios'
import request from './pangu_axios.config'

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response {
  totalSize: number | 0
  code: number
  msg: string
  data: any
}

function http({
  url,
  data,
  method,
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption) {
  const successHandler = (res: AxiosResponse<Response>) => {
    if (res.data.code === 200) {
      return res.data
    }
    throw new Error(res.data.msg || '请求失败，未知异常')
  }
  const failHandler = (error: Response) => {
    if(afterRequest) afterRequest()
    throw new Error(error.msg || '请求失败，未知异常')
  }
  if(beforeRequest) beforeRequest()
  method = method || 'GET'
  const params = Object.assign(
    typeof data === 'function' ? data() : data || {},
    {}
  )
  return method === 'GET'
    ? request.get(url, { params }).then(successHandler, failHandler)
    : request
        .post(url, params, { headers })
        .then(successHandler, failHandler)
}

export function get({
  url,
  data,
  method = 'GET',
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response> {
  return http({
    url,
    method,
    data,
    beforeRequest,
    afterRequest,
  })
}

export function post(
  url: string,
  data: any,
  combinTid = false): Promise<Response> {
  const headers: AxiosRequestHeaders =  {}
  const tid = getTid()
  if (tid) {
    headers.tid=tid
  }
  if(combinTid){
    url = tid + url
  }
  const token = getToken()
  if(token){
    headers.Authorization = `Bearer ${token}`;
  }
  return http({
    url,
    method:'POST',
    data,
    headers,
  })
}

export function postTid(url: string, data: any): Promise<Response> {
   return post(url, data, true) 
}



export default {
  post,
  get,
  postTid
}
