/* eslint-disable prettier/prettier */
import axios from 'axios';
import { UserState } from '@/store/modules/user/types';
import { post, postTid } from '@/api/pangu_http';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(tid: string, loginData: LoginData) {
  const url = `${tid}/api/plat/login`;
  return post(url, loginData);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return postTid<UserState>('/api/plat/frontend_userinfo', {});
}

export function OpUsers<T>(): Promise<T> {
  return postTid<T>(`/api/plat/user_Ops`, {});
}
