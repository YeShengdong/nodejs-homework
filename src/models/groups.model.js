import { sequelize, Sequelize, DataTypes } from '../data-access/sequelize'

export const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
export const permissionRegex = new RegExp(`^(${permissions.join('|')})$`)

const GroupsModel = sequelize.define('groups', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.ENUM({
            values: permissions
        })),
        allowNull: false
    },
})

export default GroupsModel
