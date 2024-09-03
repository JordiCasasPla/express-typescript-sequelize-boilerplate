const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        field: 'name'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'lastName'
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        field: 'password'
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        field: 'confirmed',
        defaultValue: false
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        field: 'blocked',
        defaultValue: false
      },
      role: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'role'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt'
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deletedAt'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};