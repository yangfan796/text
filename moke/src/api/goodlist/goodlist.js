import {post,get} from '@/https/https.js'
export function selectXtType(params){
    return post('/medicalType/selectXtType',params)
}
export function goodList(params){
    return post('/goodList',params)
}
export function menuList(params){
    return post('/menuList',params)
}