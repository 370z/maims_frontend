import HttpRequest from './request'

class UserProvider extends HttpRequest {
  constructor () {
    // api api
    super('https://it-ifp-auth.herokuapp.com/api/products')
  }

  async getProduct () {
    // example path https://api.myjson.com/bins/17k39m/
    const {data} = await this.get('/')
    return data
  }
  async getProductByid ({productId}) {
    // example path https://api.myjson.com/bins/17k39m/
    const {data} = await this.get(`/${productId}`)
    return data
  }
}

export default UserProvider
