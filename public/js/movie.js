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
      console.log(response);
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
          "</a> <a href='#' class='btn btn-theme save-movie'>Save Now</a>"
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
              "</a> <a href='#' class='btn btn-theme save-movie'>Save Now</a>"
          );
          $(".search-result").prepend(row);
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
          "' class='btn btn-theme more-detail'>" +
          "More Detail" +
          "</a> <a href='#' class='btn btn-theme save-movie'>Save Now</a>"
      );
      $(".popular_movie_box").prepend(row);
    });
  }
});

var nowPlayingURL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=e40035ded7723bb4c0164d21d83a0845&language=en-US&page=1";
$.ajax({
  url: nowPlayingURL,
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
          "' class='btn btn-theme more-detail'>" +
          "More Detail" +
          "</a> <a href='#' class='btn btn-theme save-movie'>Save Now</a>"
      );
      $(".top_rated_movies_box").prepend(row);
    });
  }
});
