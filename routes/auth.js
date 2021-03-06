var authController = require("../controllers/authcontroller.js");
var passport = require("../config/passport.js");
var db = require("../models");

console.log(passport);

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post("/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(200, "/");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.post(
    "/signin",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
};
