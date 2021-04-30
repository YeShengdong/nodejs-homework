import { sequelize, Sequelize, DataTypes } from '../data-access/sequelize'

const UsersModel = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default UsersModel
