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
        console.log(res)
        const token = res['user']['result']
        if (!token) {
            throw new Error('Failed to login')
        }
        return {
            token
        }
    }

    async getUsers(_args) {
        const res = await this.get('users')
        return res
    }

    async currentUser(_args) {
        const res = await this.get('users/current')
        return res
    }
}

export default AuthAPI
