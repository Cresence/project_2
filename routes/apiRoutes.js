// Requiring our models and passport as we've configured it
var db = require("../models");

module.exports = function(app, passport) {
  app.post(
    "/api/signin",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
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
        res.redirect("/signin");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  app.post("/api/movie", function(req, res) {
    console.log("2", req.body);
    db.Movie.create({
      title: req.body.title,
      plot: req.body.plot,
      genre: req.body.genre,
      released: req.body.released,
      rated: req.body.rated,
      imdbRating: req.body.imdbRating,
      director: req.body.director,
      writer: req.body.writer,
      actors: req.body.actors,
      website: req.body.website
    })
      .then(function() {
        console.log("Movie sucessfully saved!");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  // app.get("/api/movie", function(req, res) {
  //   db.Movie.findAll({ where: title > 1 }).then(function(dbMovie) {
  //     res.json(dbMovie);
  //   });
  // });
};
