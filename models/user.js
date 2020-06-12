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
  }, {});
  user.associate = function (models) {
    user.hasOne(models.transaction);
  };
  return user;
};