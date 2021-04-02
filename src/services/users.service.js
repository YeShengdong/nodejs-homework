import { v4 as uuidv4 } from 'uuid'
import Joi from 'joi'

export const userSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])')).required(),
    age: Joi.number().integer().min(4).max(130).required()
})

class Users {
    constructor() {
        this.users = generateMockUsers(3)
    }

    list(query) {
        const { loginSubstring, limit = 10 } = query

        if (loginSubstring) {
            return this.getAutoSuggestUsers(loginSubstring, limit)
        }

        return this.users.filter((user, index) => index < limit)
    }

    create(data) {
        const user = { ...data, id: uuidv4(), isDeleted: false }

        this.users.push(user)

        return this.users
    }

    find(id) {
        const user = this.users.find(({ id: userId }) => id === userId)

        return user
    }

    update(id, data) {
        this.users = this.users.map((user) => {
            const { id: userId } = user

            return id === userId ? { ...user, ...data } : user
        })

        return this.users
    }

    delete(id) {
        this.users = this.users.map((user) => {
            const { id: userId } = user

            return id === userId ? { ...user, isDeleted: true } : user
        })

        return this.users
    }

    getAutoSuggestUsers(loginSubstring, limit) {
        return this.users.filter((user, index) => {
            const { login } = user

            return index < limit && login.includes(loginSubstring)
        });
    }
}

const generateMockUsers = (number = 1) => {
    const mockUsers = []

    for (let i = 0; i < number; i++) {
        const user = {
            id: uuidv4(),
            login: `admin${i}`,
            password: `admin${i}`,
            age: i + 20,
            isDeleted: false
        }

        mockUsers.push(user)
    }

    return mockUsers
}

export default new Users
