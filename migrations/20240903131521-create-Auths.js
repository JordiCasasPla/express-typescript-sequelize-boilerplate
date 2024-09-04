const DataTypes = require("sequelize").DataTypes;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Auths", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        field: "token",
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: "user_id",
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        field: "type",
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        field: "expires",
        allowNull: false,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        field: "blacklisted",
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "createdAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updatedAt",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Auths");
  },
};
