import { request } from './api'
const HOSTNAME = 'https://127.0.0.1:3000/api'

export function index(){
  const url = `${HOSTNAME}/user`
  return request
}
