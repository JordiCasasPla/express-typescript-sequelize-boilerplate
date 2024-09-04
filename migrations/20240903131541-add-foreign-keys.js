const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'Users_role_fkey',
      references: {
        table: 'Roles',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('Auths', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'Auths_userId_fkey',
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users', 'Users_role_fkey')
    await queryInterface.removeConstraint('Auths', 'Auths_userId_fkey')
  }
};