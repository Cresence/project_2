let bCrypt = require("bcrypt-nodejs");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport, user) {
  const User = user;
  return User;
};

// serialize
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// deserialize
passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

// passport local sign up
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      const generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({ where: { email: email } }).then(function(user) {
        if (user) {
          return done(null, false, {
            message: "That email is already taken"
          });
        } else {
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword
          };

          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              console.log(created);
              return done(null, newUser);
            }
          });
        }
      });
    }
  )
);
