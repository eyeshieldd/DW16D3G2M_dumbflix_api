'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    subscribe: DataTypes.BOOLEAN
  }, { timestamps: false });
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};