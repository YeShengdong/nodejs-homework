import UsersModel from '../models/users.model'

const createPredefinedUsers = async (number = 1) => {
    for (let i = 0; i < number; i++) {
        const user = {
            login: `admin${i}`,
            password: `admin${i}`,
            age: i + 20
        }

        await UsersModel.create(user)
    }
}

(async () => {
    try {
        await UsersModel.sync({ force: true })
        await createPredefinedUsers(5)

        console.log('All models were synchronized successfully.')
    } catch (error) {
        console.log('synchronized failed.', error)
    }
})()
