module.exports = function(sequelize, DataTypes) {

    let Watchlist = sequelize.define('Watchlist', {
      userid: DataTypes.INTEGER,
      movieid: DataTypes.STRING,
      poster: DataTypes.STRING,
      is_watched: DataTypes.BOOLEAN
    })

    return Watchlist;
  };
  