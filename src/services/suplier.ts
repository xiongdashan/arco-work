/* eslint-disable prettier/prettier */
import { post } from '../api/pangu_http';

const SuplierMgr = (data: any) => post('/core/api/crm/org/mgr/2', data);

const SuplierList = <T>(data: any) => post<T>('/core/api/crm/org/list/2', data);

const SuplierDel = (data: any) => post('/core/api/crm/org/del', data);

export { SuplierMgr, SuplierList, SuplierDel };
