var movies = [
  "The Matrix",
  "The Notebook",
  "Mr. Nobody",
  "The Lion King",
  "Avenger",
  "Star Wars",
  "Hostel",
  "300",
  "Creed",
  "Fight Club",
  "Tangled",
  "Night out"
];

// Write code between the dashes below to hit the queryURL with $ajax, then take the response data
// and display it in the div with an id of movie-view

function displayMovieInfo() {
  for (var i = 0; i < movies.length; i++) {
    // movies.forEach(function(e, i){
    var queryURL =
      "https://www.omdbapi.com/?t=" + movies[i] + "&apikey=trilogy";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      // $(".movie_box").text(JSON.stringify(response));
      var row = $("<div>");
      row.addClass("image-box col-sm-6 col-md-3");
      row.append(
        "<div class='poster-box'><img src='" +
          response.Poster +
          "' onerror=\"this.onerror=null;this.src='../images/not-found.png';\"/></div>"
      );
      row.append(
        "<p class='hover-description'><span>" + response.Plot + "</span></p>"
      );
      row.append("<h5>" + response.Title + "</h5>");
      row.append(
        "<a href='/detail' id='" +
          response.imdbID +
          "' class='btn btn-theme more-detail'>" +
          "More Detail" +
          "</a> <a href='#' id='" +
          response.imdbID +
          "' onClick='reply_click()' class='btn btn-theme save-movie'>Save Now</a>"
      );
      $(".movie_box").prepend(row);
    });
  }
}

displayMovieInfo();
$(document).on("click", ".more-detail", function() {
  var movieId = this.id;
  console.log(movieId);
  sessionStorage.setItem("movieId", movieId);
});
getMovie();
function getMovie() {
  var id = sessionStorage.getItem("movieId");
  //$(".movie-detail").append(id);
  var queryURL = "https://www.omdbapi.com/?i=" + id + "&apikey=trilogy";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // $(".movie_box").text(JSON.stringify(response));

    $(".img-box").append(
      "<img src='" +
        response.Poster +
        "' class='img-fluid' onerror=\"this.onerror=null;this.src='../images/not-found.png';\"/>"
    );
    var row = $("<div>");
    row.addClass("movie-description");
    row.append("<h2>" + response.Title + "</h2>");
    row.append(
      "<a href='#' data-toggle='modal' data-target='#vidioModal' class='movie-trailer'>" +
        "<span class='fa fa-play'></span> Play Trailer</a>"
    );
    row.append("<p>" + response.Plot + "</p>");

    row.append("<p> <strong> Genre: </strong>" + response.Genre + "</p>");
    row.append("<p> <strong> Released: </strong>" + response.Released + "</p>");
    row.append("<p> <strong> Rated: </strong>" + response.Rated + "</p>");
    row.append(
      "<p> <strong> IMDB Rating: </strong>" + response.imdbRating + "</p>"
    );
    row.append("<p> <strong> Director: </strong>" + response.Director + "</p>");
    row.append("<p> <strong> Writer: </strong>" + response.Writer + "</p>");
    row.append("<p> <strong> Actor: </strong>" + response.Actors + "</p>");
    row.append(
      "<a href='" +
        response.Website +
        "' class='btn btn-theme' target='_blank'> Wartch Now </a> <a href='#' class='btn btn-theme save-movie'>Save Now</a>"
    );
    $(".movie-detail").prepend(row);

    var imdbId = response.imdbID;
    function UrlExists() {
      var qURL =
        "https://api.themoviedb.org/3/movie/" +
        imdbId +
        "/videos?api_key=e40035ded7723bb4c0164d21d83a0845";
      var http = new XMLHttpRequest();
      http.open("HEAD", qURL, false);
      http.send();
      if (http.status === 200) {
        $.ajax({
          url: qURL,
          method: "GET"
        }).then(function(response) {
          // response.status(404).send("uh oh");
          console.log("response url :" + response);
          var videos = response.results[0];
          if (typeof videos !== "undefined") {
            $(".trailer-box").append(
              "<iframe id='trailer' src='https://www.youtube.com/embed/" +
                videos.key +
                "'  frameborder='0' allow='autoplay'; encrypted-media' allowfullscreen></iframe>"
            );
          } else {
            $(".movie-trailer").html("");
          }
        });
      } else {
        console.log("oh no");
        $(".movie-trailer").html("");
      }
    }
    UrlExists();
  });
}
$("#search-input").keypress(function(event) {
  if (event.keyCode === 13 || event.which === 13) {
    searchData();
  }
});
$(document).on("click", ".search-movie", function() {
  searchData();
});
function searchData() {
  $(".search-result").html("");
  var searchInput = $("#search-input")
    .val()
    .trim();
  console.log(searchInput);
  if (searchInput !== "") {
    $(".main-container").html("");
    var queryURL =
      "https://www.omdbapi.com/?s=" +
      searchInput +
      "&type=movie&apikey=trilogy";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      if (response.Response === "True") {
        for (var i = 0; i < response.Search.length; i++) {
          var row = $("<div>");
          row.addClass("image-box col-sm-6 col-md-3");
          row.append(
            "<div class='poster-box'><img src='" +
              response.Search[i].Poster +
              "' onerror=\"this.onerror=null;this.src='../images/not-found.png';\"/></div>"
          );
          if (response.Search[i].Plot === undefined) {
            row.append(
              "<p class='hover-description'><span>" +
                response.Search[i].Title +
                "<span></p>"
            );
          } else {
            row.append(
              "<p class='hover-description'><span>" +
                response.Search[i].Plot +
                "</span></p>"
            );
          }
          row.append("<h5>" + response.Search[i].Title + "</h5>");
          row.append(
            "<a href='/detail' id='" +
              response.Search[i].imdbID +
              "' class='btn btn-theme more-detail'>" +
              "More Detail" +
              "</a> <a href='#' id='" +
              response.imdbID +
              "' onClick='reply_click()' class='btn btn-theme save-movie'>Save Now</a>"
          );
          $(".search-result").append(row);
        }
      } else {
        $(".search-result").prepend(
          "<div class='col-sm-12'><h1 class='top-heading text-center'>Result Not found</h1></div>"
        );
      }
    });
  } else {
    $("#alertMovieSearch").modal("toggle");
  }
}
var popularURL =
  " https://api.themoviedb.org/3/discover/movie?api_key=e40035ded7723bb4c0164d21d83a0845&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

$.ajax({
  url: popularURL,
  method: "GET"
}).then(function(response) {
  // console.log("Response ");
  // console.log(response);
  for (var i = 0; i < response.results.length; i++) {
    var queURL =
      "https://api.themoviedb.org/3/movie/" +
      response.results[i].id +
      "?api_key=e40035ded7723bb4c0164d21d83a0845";
    $.ajax({
      url: queURL,
      method: "GET"
    }).then(function(res) {
      // console.log("Response for id" + res);
      // console.log(res);
      var row = $("<div>");
      row.addClass("image-box col-sm-6 col-md-3");
      row.append(
        "<div class='poster-box'><img src='https://image.tmdb.org/t/p/w500" +
          res.backdrop_path +
          "' onerror=\"this.onerror=null;this.src='../images/not-found.png';\"/></div>"
      );
      row.append(
        "<p class='hover-description'><span>" + res.overview + "</span></p>"
      );
      row.append("<h5>" + res.original_title + "</h5>");
      row.append(
        "<a href='/detail' id='" +
          res.imdb_id +
          "' onClick='reply_click()' class='btn btn-theme more-detail'>" +
          "More Detail" +
          "</a> <a href='#' id='" +
          res.imdb_id +
          "' onClick='reply_click()' class='btn btn-theme save-movie'>Save Now</a>"
      );
      $(".popular_movie_box").prepend(row);
    });
  }
});

var topRatedURL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=e40035ded7723bb4c0164d21d83a0845&language=en-US&page=1";
$.ajax({
  url: topRatedURL,
  method: "GET"
}).then(function(response) {
  for (var i = 0; i < response.results.length; i++) {
    var queURL =
      "https://api.themoviedb.org/3/movie/" +
      response.results[i].id +
      "?api_key=e40035ded7723bb4c0164d21d83a0845";
    $.ajax({
      url: queURL,
      method: "GET"
    }).then(function(res) {
      var row = $("<div>");
      row.addClass("image-box col-sm-6 col-md-3");
      row.append(
        "<div class='poster-box'><img src='https://image.tmdb.org/t/p/w500" +
          res.backdrop_path +
          "' onerror=\"this.onerror=null;this.src='../images/not-found.png';\"/></div>"
      );
      row.append(
        "<p class='hover-description'><span>" + res.overview + "</span></p>"
      );
      row.append("<h5>" + res.original_title + "</h5>");
      row.append(
        "<a href='/detail' id='" +
          res.imdb_id +
          "' onClick='reply_click()' class='btn btn-theme more-detail'>" +
          "More Detail" +
          "</a> <a href='#' id='" +
          res.imdb_id +
          "' onClick='reply_click()' class='btn btn-theme save-movie'>Save Now</a>"
      );
      $(".top_rated_movies_box").prepend(row);
    });
  }
});

var dataURL = "/api/movie";
$.ajax({
  url: dataURL,
  method: "GET"
}).then(function(response) {
  for (var i = 0; i < response.results.length; i++) {
    var queURL =
      "https://api.themoviedb.org/3/movie/" +
      response.results[i].id +
      "?api_key=e40035ded7723bb4c0164d21d83a0845";
    $.ajax({
      url: queURL,
      method: "GET"
    }).then(function(res) {
      var row = $("<div>");
      row.addClass("image-box col-sm-6 col-md-3");
      row.append(
        "<div class='poster-box'><img src='https://image.tmdb.org/t/p/w500" +
          res.backdrop_path +
          "' onerror=\"this.onerror=null;this.src='../images/not-found.png';\"/></div>"
      );
      row.append(
        "<p class='hover-description'><span>" + res.overview + "</span></p>"
      );
      row.append("<h5>" + res.original_title + "</h5>");
      row.append(
        "<a href='/detail' id='" +
          res.imdb_id +
          "' onClick='reply_click()' class='btn btn-theme more-detail'>" +
          "More Detail" +
          "</a> <a href='#' id='" +
          res.imdb_id +
          "' onClick='reply_click()' class='btn btn-theme save-movie'>Save Now</a>"
      );
      $(".top_rated_movies_box").prepend(row);
    });
  }
});

// Getting references to our form and input
// var signUpForm = $(".create-form");

// When the signup button is clicked, we validate the email and password are not blank
$(document).on("submit", ".create-form", function(event) {
  event.preventDefault();

  // If we have an email and password, run the signUpUser function
  // signUpUser(dbUser.email, dbUser.password);
  var emailSignupInput = $("#signup-email.form-control").val();
  var passwordSignupInput = $("#signup-password.form-control").val();

  if (emailSignupInput === "" || passwordSignupInput === "") {
    console.log("Field is blank! Try Again!");
    return;
  }

  $.post("/api/signup", {
    email: emailSignupInput,
    password: passwordSignupInput
  })
    .then(function() {
      // console.log(data);
      // console.log("Line 305 of movie.js ran");
      // console.log(emailSignupInput);
      // console.log(passwordSignupInput);
      window.location.replace("/");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
  // emailSignupInput.val("");
  // passwordSignupInput.val("");
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
// function signUpUser(email, password) {
//   $.post("/api/signup", {
//     email: email,
//     password: password
//   })
//     .then(function(data) {
//       console.log(data);
//       // window.location.replace("/");
//       // If there's an error, handle it by throwing up a bootstrap alert
//     })
//     .catch(handleLoginErr);
// }

function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}

// Getting references to our form and inputs
// var loginForm = $("form.login-form");

// When the form is submitted, we validate there's an email and password entered
$(document).on("submit", ".login-form", function(event) {
  event.preventDefault();

  var emailLoginInput = $("#login-email.form-control")
    .val()
    .trim();
  var passwordLoginInput = $("#login-password.form-control")
    .val()
    .trim();

  if (emailLoginInput === "" || passwordLoginInput === "") {
    console.log("No empty values!");
    return;
  }
  $.post("/api/signin", {
    email: emailLoginInput,
    password: passwordLoginInput
  })
    .then(function() {
      window.location.replace("/");
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });

  // If we have an email and password we run the loginUser function and clear the form
  // loginUser(userData.email, userData.password);
  // emailLoginInput.val("");
  // passwordLoginInput.val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
// function loginUser(email, password) {
//   $.post("/api/login", {
//     email: email,
//     password: password
//   })
//     .then(function() {
//       window.location.replace("/members");
//       // If there's an error, log the error
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }
// eslint-disable-next-line camelcase
function reply_click() {
  console.log(event.srcElement.id);
  $.ajax({
    url: `https://www.omdbapi.com?i=${event.srcElement.id}&apikey=trilogy`
  }).then(function(res) {
    const {
      Title,
      Plot,
      Genre,
      Released,
      Rated,
      imdbRating,
      Director,
      Writer,
      Actors,
      Website
    } = res;
    console.log(res);
    $.post("/api/movie", {
      title: Title,
      plot: Plot,
      genre: Genre,
      released: Released,
      rated: Rated,
      imdbRating,
      director: Director,
      writer: Writer,
      actors: Actors,
      website: Website
    })
      .then(function() {
        window.location.replace("/");
      })
      .catch(function(err) {
        res.json(err);
      });
  });
}

reply_click();
