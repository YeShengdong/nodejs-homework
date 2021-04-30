import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('nodejsHomeWork', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch((error) => {
    console.error('Unable to connect to the database:', error)
})

export * from 'sequelize'
export {
    sequelize
}
