module.exports = function(sequelize, Sequelize) {
<<<<<<< HEAD
  let User = sequelize.define("User", {
=======
  var User = sequelize.define("User", {
>>>>>>> 2d9fa22b363ae7021567975b544a032c40b33b1c
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
