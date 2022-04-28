/* eslint-disable prettier/prettier */
import {post} from '../api/pangu_http'

const customerMgr = (data: any) => post('/core/api/crm/org/mgr', data)

const customerList = ( data: any) => post('/core/api/crm/org/list', data)

const customerDel = (data: any) => post('/core/api/crm/org/del', data)

const asignOp = (data: any) => post('/core/api/crm/customer/asignOp', data)

export {
    customerMgr,
    customerList,
    customerDel,
    asignOp
}   