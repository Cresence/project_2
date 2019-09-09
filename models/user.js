module.exports = function(sequelize, Sequelize) {
  let User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    username: {
      type: Sequelize.TEXT
    },

    about: {
      type: Sequelize.TEXT
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    lastLogin: {
      type: Sequelize.DATE
    },

    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });

  User.associate = function(models) {
    // Associating User with Movies
    // When an User is deleted, also delete any associated Movies
    User.hasMany(models.Movie, {
      onDelete: "cascade"
    });
  };

  return User;
};
