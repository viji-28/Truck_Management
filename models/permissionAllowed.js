const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const permisionAllowed = sequelize.define(
  'permisionAllowed',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    designationId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

permisionAllowed.associate = (models) => {
  permisionAllowed.belongsTo(models.permission, {
    foreignKey: 'permissionId',
    allowNull: false,
  });
  permisionAllowed.belongsTo(models.designation, {
    foreignKey: 'designationId',
    allowNull: false,
  });
};

module.exports = permisionAllowed;
