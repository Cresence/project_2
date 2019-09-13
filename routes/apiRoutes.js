// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function(app, passport) {
  app.post(
    "/api/signin",
    passport.authenticate("local", {
      failureRedirect: "/api/signin"
    }),
    function(req, res) {
      db.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(dbUser) {
        res.json(dbUser.username);
      });
    }
  );

  app.post("/api/signup", function(req, res) {
    console.log("1", req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect("/");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });
};
