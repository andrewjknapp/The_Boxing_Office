module.exports = function(sequelize, DataTypes) {

    let Review = sequelize.define('Review', {
      userid: DataTypes.INTEGER,
      user_name: DataTypes.STRING,
      movie_name: DataTypes.STRING,
      review_title: DataTypes.STRING,
      review_text: DataTypes.TEXT,
      user_rating: DataTypes.INTEGER
    })

    return Review;
  };
  