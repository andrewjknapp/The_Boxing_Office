function displayMovieInfo() {
  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var watchListDiv = $("<div id='watchlist'>");
    watchListDiv.append(
      `<li>
        <div class="collapsible-header orange accent-1">
          <div class="poster-container">
            <div class="poster" style="background-image: url('${response.Poster}');"></div>
          </div>
          <div>
            <h5>${response.Title} (${response.Year})</h5>
            <h6>Director: ${response.Director}</h6>
            <h6>Actors: ${response.Actors}</h6>
            <p>${response.Plot}</p>
          </div>
        </div>
        </li>`);
    var posterDiv = $("<div class='poster-container'>");
    var imgURL = response.Poster;
    var image = $("<img class='poster'>").attr("src", imgURL);
    posterDiv.append(image);
  });
}

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < movies.length; i++) {
    var a = $("<button>");
    a.addClass("movie-btn");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-movie").on("click", function(event) {
  event.preventDefault();
  var movie = $("#movie-input")
    .val()
    .trim();
  movies.push(movie);
  renderButtons();
});

$(document).on("click", ".movie-btn", displayMovieInfo);

renderButtons();
