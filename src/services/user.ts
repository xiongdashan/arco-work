/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  UserState
} from '@/store/modules/user/types';
import {
  post, postTid
} from '@/api/pangu_http';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(tid: string, loginData: LoginData) {
  const url = `${tid}/api/plat/login`;
  return post(url, loginData)
}

export function logout() {
  return axios.post < LoginRes > ('/api/user/logout');
}

export function getUserInfo() {
  return new Promise < UserState > ((resolve, reject) => {
    postTid('/api/plat/frontend_userinfo', {}).then(res => {
      resolve(res.data as UserState);
    }).catch(err => {
      reject(err);
    });
  })
}

export const OpUsers = () => postTid(`/api/plt/user_Ops`, {})