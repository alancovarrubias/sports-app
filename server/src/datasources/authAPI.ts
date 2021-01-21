import { RESTDataSource } from 'apollo-datasource-rest'

class AuthAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://auth:3000'
    }

    async login({ username, password }) {
        const user = {
            user: {
                username,
                password,
            }
        }
        const res = await this.post('sessions', user)
        const token = res['user']['result']
        return {
            token
        }
    }

    async getUsers({ username, password }) {
        const res = await this.get('users')
        return res
    }
}

export default AuthAPI
