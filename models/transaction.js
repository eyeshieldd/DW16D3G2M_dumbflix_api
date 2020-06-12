'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    attach: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  transaction.associate = function (models) {
    transaction.belongsTo(models.user, {

      as: "userID",
      foreignKey: {
        name: "userId",
      },
    });
  };
  return transaction;
};