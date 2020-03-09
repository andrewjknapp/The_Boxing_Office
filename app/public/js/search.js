$(document).ready(function() {
  function movieSearch(searchString) {
    let queryURL = `http://omdbapi.com/?apikey=trilogy&t=${searchString}`;
    $.ajax({
      url: queryURL
    }).then(function(response) {
      if (response !== null) {
        renderMovieOnPage(response);
      }
    });
  }

  $("#movie-submit").on("click", function() {
    movieSearch(
      $("#movie-search")
        .val()
        .trim() || "parasite"
    );
    $("#movie-search").val("");
  });

  function renderMovieOnPage(data) {
    console.log(data);
    let scoreColor = "metascore-green";
    if ((data.Metascore >= 40) && (data.Metascore <= 60)) {
      scoreColor = "metascore-orange"
    };
    if (data.Metascore < 40) {
      scoreColor = "metascore-red"
    };
    $("#poster").prepend(`
      <div class='row'>
        <div class="col m3 poster-container">
          <img src="${data.Poster}" alt="${data.Title}" class="poster"/>
        </div>
        <div class="col m9 movie-info-container">
          <h4>${data.Title} (${data.Year})</h4>
          <h5>Rated ${data.Rated}</h5>
          <h5>Directed by ${data.Director}</h5>
          <h6>${data.Actors}</h6>
          <p>${data.Plot}</p>
          <h6><span class="${scoreColor}">${data.Metascore}</span>Metascore</h6>
        </div>
      </div>
    `);
  }
});
