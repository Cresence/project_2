var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log(db.User);
    db.User.findAll({}).then(function(dbUsers) {
      res.render("index", {
        msg: "Welcome To My Website!",
        users: dbUsers
      });
    });
  });
  app.post("/", function(req, res) {
    res.status(200);
    console.log(req.body);
  });
  app.get("/detail", function(req, res) {
    var movieId = this.id;
    res.render("detail", {
      // msg: "Welcome!",
      id: movieId
    });
  });
  app.get("/popular", function(req, res) {
    res.render("popular", {
      // msg: "Welcome!",
      // id: movieId
    });
  });
  app.get("/top_rated", function(req, res) {
    res.render("top_rated", {
      // msg: "Welcome!",
      // id: movieId
    });
  });
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/data", function(req, res) {
    res.render("data", {
      msg: "Welcome to the data?"
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  // app.set("views", __dirname + "/views");
};
