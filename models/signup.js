const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const signup = sequelize.define(
  'signup',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PhoneNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loginId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    signed: {
      type: DataTypes.ENUM('Signed', 'UnSigned'),
      defaultValue: 'UnSigned',
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

signup.associate = (models) => {
  signup.belongsTo(models.login, { foreignKey: 'loginId', allowNull: true });
};

module.exports = signup;
