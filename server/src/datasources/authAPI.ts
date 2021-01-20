import { RESTDataSource } from 'apollo-datasource-rest'

class AuthAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://auth:3000'
    }

    async login({ username, password }) {
        const res = await this.post('sessions')
        return {
            username,
            password,
        }
    }

    async getUsers({ username, password }) {
        const res = await this.get('users')
        return {
            username,
            password,
        }
    }
}

export default AuthAPI
