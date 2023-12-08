const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const route = sequelize.define(
  'route',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locations: {
      type: DataTypes.ARRAY(
        DataTypes.JSON({
          longitude: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          latitude: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        })
      ),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = route;
