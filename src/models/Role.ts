import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { User } from './User'

type RoleAssociations = 'users'

export class Role extends Model<
  InferAttributes<Role, {omit: RoleAssociations}>,
  InferCreationAttributes<Role, {omit: RoleAssociations}>
> {
  declare name: string
  declare id: CreationOptional<number>
  declare description: string | null
  declare type: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // Role hasMany User (as Users)
  declare users?: NonAttribute<User[]>
  declare getUsers: HasManyGetAssociationsMixin<User>
  declare setUsers: HasManySetAssociationsMixin<User, number>
  declare addUser: HasManyAddAssociationMixin<User, number>
  declare addUsers: HasManyAddAssociationsMixin<User, number>
  declare createUser: HasManyCreateAssociationMixin<User>
  declare removeUser: HasManyRemoveAssociationMixin<User, number>
  declare removeUsers: HasManyRemoveAssociationsMixin<User, number>
  declare hasUser: HasManyHasAssociationMixin<User, number>
  declare hasUsers: HasManyHasAssociationsMixin<User, number>
  declare countUsers: HasManyCountAssociationsMixin
  
  declare static associations: {
    users: Association<Role, User>
  }

  static initModel(sequelize: Sequelize): typeof Role {
    Role.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      paranoid: true
    })
    
    return Role
  }
}
