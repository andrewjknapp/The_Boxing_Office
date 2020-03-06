module.exports = function(sequelize, DataTypes) {

    let Watchlist = sequelize.define('Watchlist', {
      userID: DataTypes.INTEGER,
      movieID: DataTypes.STRING,
      poster: DataTypes.STRING
    })
    
    return Watchlist;
  };
  