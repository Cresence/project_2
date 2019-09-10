module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {

    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  return User;
};
