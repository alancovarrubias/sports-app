import { RESTDataSource } from 'apollo-datasource-rest'

class AuthAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://auth:3000'
    }

    async registerUser(args) {
        const res = await this.post('users', args)
        return res.token
    }

    async loginUser(args) {
        const res = await this.post('login', args)
        return res.token
    }

    async currentUser(_args) {
        return await this.get('users/current')
    }
}

export default AuthAPI
