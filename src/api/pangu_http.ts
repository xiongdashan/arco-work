/* eslint-disable prettier/prettier */
import { getTid } from '@/utils/auth';
import loadingState from '@/utils/filters/loader';
import axios from 'axios';

export interface Response {
  totalSize: number | 0;
  code: number;
  msg: string;
  data: any;
}

export function post(
  url: string,
  data: any,
  combinTid = false
): Promise<Response> {
  const loader = loadingState();
  loader.start();
  const tid = getTid();
  if (combinTid) {
    url = tid + url;
  }
  return new Promise<Response>((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        loader.end();
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        loader.end();
      });
  });
}

export function postTid(url: string, data: any): Promise<Response> {
  return post(url, data, true);
}

export default {
  post,
  postTid,
};
