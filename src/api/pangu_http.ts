import { getTid } from '@/utils/auth';
import loadingState from '@/utils/filters/loader';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';

export interface Response {
  code: number;
  msg: string;
  data: any;
}

export async function post<T>(url: string, data: any, combinTid = false) {
  const loader = loadingState();
  loader.start();
  const tid = getTid();
  if (combinTid) {
    if (!tid) {
      const router = useRouter();
      window.location.href = '/logout';
      throw new Error('tid is empty');
    }
    url = tid + url;
  }
  return new Promise<T>((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        loader.end();
        resolve(res.data as T);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        loader.end();
      });
  });
}

export function postTid<T>(url: string, data: any) {
  return post<T>(url, data, true);
}

export default {
  post,
  postTid,
};
