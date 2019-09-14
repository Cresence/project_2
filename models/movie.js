module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING
    },
    plot: {
      type: DataTypes.TEXT
    },
    genre: {
      type: DataTypes.STRING
    },
    released: {
      type: DataTypes.STRING
    },
    rated: {
      type: DataTypes.STRING
    },
    imdbRating: {
      type: DataTypes.STRING
    },
    director: {
      type: DataTypes.STRING
    },
    writer: {
      type: DataTypes.STRING
    },
    actors: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    }
  });

  Movie.associate = function(models) {
    // We're saying that a Movie should belong to an User
    // A Movie can't be created without an User due to the foreign key constraint
    Movie.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Movie;
};
