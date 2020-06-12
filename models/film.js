'use strict';
module.exports = (sequelize, DataTypes) => {
  const film = sequelize.define('film', {
    title: DataTypes.STRING,
    thumbnailFilm: DataTypes.STRING,
    year: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING

  }, {});
  film.associate = function (models) {
    film.belongsTo(models.category, {
      as: "category",
      foreignKey: {
        name: "categoryId",
      },
    });
    film.hasMany(models.episode)

  };
  return film;
};