/* eslint-disable import/prefer-default-export */
import { post } from '@/api/pangu_http';

export const createAirOrder = (data: any) =>
  post('/core/api/order/air/creat', data);
