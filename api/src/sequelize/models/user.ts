/* eslint-disable no-use-before-define */
import {Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional} from 'sequelize'
import {sequelize} from './sequelize'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>
  declare email: string
  declare firstname: string
  declare lastname: string
  declare age: number
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4(),
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'User',
  timestamps: false
})

export default User
