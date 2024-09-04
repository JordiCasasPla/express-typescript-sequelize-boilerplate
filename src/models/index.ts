import type { Sequelize, Model } from 'sequelize'
import { User } from './User'
import { Auth } from './Auth'
import { Role } from './Role'

export {
  User,
  Auth,
  Role
}

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize)
  Auth.initModel(sequelize)
  Role.initModel(sequelize)

  User.belongsTo(Role, {
    as: 'role',
    foreignKey: 'role_id'
  })
  User.hasMany(Auth, {
    as: 'tokens',
    foreignKey: 'user_id'
  })
  Auth.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
  })
  Role.hasMany(User, {
    as: 'users',
    foreignKey: 'role_id'
  })

  return {
    User,
    Auth,
    Role
  }
}
