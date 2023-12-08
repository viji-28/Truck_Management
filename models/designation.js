const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const designation = sequelize.define(
  'designation',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = designation;
