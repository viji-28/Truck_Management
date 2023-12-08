const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const truck = sequelize.define(
  'truck',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    variant: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    VIN: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chasisNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RCNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rcPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    truckPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    condition: {
      type: DataTypes.ENUM('working', 'not-working'),
      allowNull: true,
      defaultValue: 'working',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'deactive', 'pending'),
      allowNull: true,
      defaultValue: 'active',
    },
    createdBy: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

truck.associate = (models) => {
  truck.belongsTo(models.login, { foreignKey: 'createdBy', allowNull: true });
};

module.exports = truck;
