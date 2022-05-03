import axios from 'axios'
const getToken = function () {
  if (process.server) {
    return
  }
}
export async function request(method, url, data, auth = false) {
  const headers = {}
  if (auth) {
    headers['auth-token'] = getToken()
  }
}
try {
  //call api
  const response = await axios({
    method,
    url,
    data,
    headers,
  })
  return response
} catch (e) {
  return e
}
