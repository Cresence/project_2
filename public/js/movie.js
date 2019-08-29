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
      // $(".movie-box").text(JSON.stringify(response));
      var row = $("<div>");
      row.addClass("image-box col-sm-3");
      row.append("<img src=" + response.Poster + " />");
      row.append("<p class='hover-description'>" + response.Plot + "</p>");
      row.append("<h5>" + response.Title + "</h5>");
      row.append(
        "<a href='/detail' id='" +
          response.imdbID +
          "' class='btn btn-info more-detail'>" +
          "More Detail" +
          "</a>"
      );
      $(".movie-box").prepend(row);
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
    // $(".movie-box").text(JSON.stringify(response));

    $(".img-box").append(
      "<img src=" + response.Poster + " class='img-fluid'/>"
    );
    var row = $("<div>");
    row.addClass("movie-description");
    row.append("<h2>" + response.Title + "</h2>");
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
        "' class='btn btn-info' target='_blank' > Wartch Now </a>"
    );
    $(".movie-detail").prepend(row);
  });
}

$(document).on("click", ".search-movie", function() {
  $(".movie-detail").html("display", "none");
});
