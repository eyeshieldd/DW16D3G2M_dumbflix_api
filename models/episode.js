'use strict';
module.exports = (sequelize, DataTypes) => {
  const episode = sequelize.define('episode', {
    title: DataTypes.STRING,
    thumbnailFilm: DataTypes.STRING,
    linkFilm: DataTypes.STRING,
    filmId: DataTypes.INTEGER

  }, {});
  episode.associate = function (models) {
    episode.belongsTo(models.film, {
      as: "film",
      foreignKey: {
        name: "filmId",
      },
    });
  };
  return episode;
};