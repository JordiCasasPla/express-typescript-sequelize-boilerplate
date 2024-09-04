import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
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
import type { Auth } from './Auth'
import type { Role } from './Role'

type UserAssociations = 'role' | 'tokens'

export class User extends Model<
  InferAttributes<User, {omit: UserAssociations}>,
  InferCreationAttributes<User, {omit: UserAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string | null
  declare lastName: string | null
  declare email: string | null
  declare password: string | null
  declare confirmed: boolean | null
  declare blocked: boolean | null
  declare role_id: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare deletedAt: CreationOptional<Date>

  // User belongsTo Role (as Role)
  declare role?: NonAttribute<Role>
  declare getRole: BelongsToGetAssociationMixin<Role>
  declare setRole: BelongsToSetAssociationMixin<Role, number>
  declare createRole: BelongsToCreateAssociationMixin<Role>
  
  // User hasMany Auth (as Tokens)
  declare tokens?: NonAttribute<Auth[]>
  declare getTokens: HasManyGetAssociationsMixin<Auth>
  declare setTokens: HasManySetAssociationsMixin<Auth, number>
  declare addToken: HasManyAddAssociationMixin<Auth, number>
  declare addTokens: HasManyAddAssociationsMixin<Auth, number>
  declare createToken: HasManyCreateAssociationMixin<Auth>
  declare removeToken: HasManyRemoveAssociationMixin<Auth, number>
  declare removeTokens: HasManyRemoveAssociationsMixin<Auth, number>
  declare hasToken: HasManyHasAssociationMixin<Auth, number>
  declare hasTokens: HasManyHasAssociationsMixin<Auth, number>
  declare countTokens: HasManyCountAssociationsMixin
  
  declare static associations: {
    role: Association<User, Role>,
    tokens: Association<User, Auth>
  }

  static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      role_id: {
        type: DataTypes.INTEGER.UNSIGNED
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
    
    return User
  }
}
