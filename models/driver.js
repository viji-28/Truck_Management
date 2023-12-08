const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const driver = sequelize.define(
  'driver',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    licenseNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    licensePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    licenseType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shift: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dailyWage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bata: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('approved', 'reject', 'pending'),
      defaultValue: 'pending',
      allowNull: true,
    },
    truckId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: true,
    },
    routeId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: true,
    },
    loginId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

driver.associate = (models) => {
  driver.belongsTo(models.login, { foreignKey: 'loginId', allowNull: true });
  driver.belongsTo(models.truck, { foreignKey: 'truckId', allowNull: true });
  driver.belongsTo(models.truck, { foreignKey: 'routeId', allowNull: true });
};

module.exports = driver;
