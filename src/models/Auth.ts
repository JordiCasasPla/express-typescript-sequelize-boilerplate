import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { User } from './User'

type AuthAssociations = 'user'

export class Auth extends Model<
  InferAttributes<Auth, {omit: AuthAssociations}>,
  InferCreationAttributes<Auth, {omit: AuthAssociations}>
> {
  declare id: CreationOptional<number>
  declare token: string
  declare userId: string
  declare type: 'refresh' | 'resetPassword' | 'verifyEmail'
  declare expires: string
  declare blacklisted: boolean | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Auth belongsTo User (as User)
  declare user?: NonAttribute<User>
  declare getUser: BelongsToGetAssociationMixin<User>
  declare setUser: BelongsToSetAssociationMixin<User, number>
  declare createUser: BelongsToCreateAssociationMixin<User>
  
  declare static associations: {
    user: Association<Auth, User>
  }

  static initModel(sequelize: Sequelize): typeof Auth {
    Auth.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('refresh', 'resetPassword', 'verifyEmail'),
        allowNull: false
      },
      expires: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize
    })
    
    return Auth
  }
}
