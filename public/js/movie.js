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

// ------YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE.
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
      row.append("<p class='hover-description'>" + response.Plot + "</p>");
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
    var qURL =
      "https://api.themoviedb.org/3/movie/" +
      imdbId +
      "/videos?api_key=e40035ded7723bb4c0164d21d83a0845";
    $.ajax({
      url: qURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var videos = response.results[0].key;
      console.log(videos);
      $(".trailer-box").append(
        "<iframe id='trailer' src='https://www.youtube.com/embed/" +
          videos +
          "'  frameborder='0' allow='autoplay'; encrypted-media' allowfullscreen></iframe>"
      );
    });
  });
}

$(document).on("click", ".search-movie", function() {
  //$(".movie_box").html("display", "none");
  //  document.getElementById(elementID).innerHTML = "";
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
              "<p class='hover-description'>" +
                response.Search[i].Title +
                "</p>"
            );
          } else {
            row.append(
              "<p class='hover-description'>" + response.Search[i].Plot + "</p>"
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
        $(".search-result").prepend("<h1>Result Not found</h1>");
        console.log("Result not found");
      }
    });
  } else {
    // alert("Please enter any movie name before search");
    $("#alertMovieSearch").modal("toggle");
  }
});

var imdbId = "tt0450278";
var qURL =
  "https://api.themoviedb.org/3/movie/" +
  imdbId +
  "/videos?api_key=e40035ded7723bb4c0164d21d83a0845";
// var queURL =
//   "https://api.themoviedb.org/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc?api_key=e40035ded7723bb4c0164d21d83a0845";
// var qURL =
//   "https://api.themoviedb.org/movie/" +
//   "discover/movie?sort_by=popularity.desc?api_key=e40035ded7723bb4c0164d21d83a0845";
$.ajax({
  url: qURL,
  method: "GET"
}).then(function(response) {
  console.log("Response : " + response);
});
