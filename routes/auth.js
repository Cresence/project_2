var authController = require("../controllers/authcontroller.js");
var passport = require("../config/passport.js");

module.exports = function(app) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.post("/signin", passport.authenticate("local", 
    {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
