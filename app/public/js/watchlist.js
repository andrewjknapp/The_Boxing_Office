
$(document).ready(function () {

    $('#searchBtn').on('click', async function (event) {
        let search = $('#searchText').val();
        let data = await movieSearch(search);
        console.log(data);
    });
    function movieSearch(searchString) {
        let queryURL = `http://omdbapi.com/?apikey=trilogy&t=${searchString}`;
        $.ajax({
            url: queryURL
        }).then(function (response) {
            if (response !== null) {
                console.log(response);
                let { Poster, Title, Year, Plot, imdbID } = response;
                let currentMovie =
                    `<section class='watchlistInfo'>
                        <div class="poster" style="background-image: url(${Poster});"></div>
                        <div class="title"><h3>${Title}  (${Year})</h3></div>
                        <div class="plot">${Plot}</div>
                        <div class="watched" style="background-image: url(assets/Popcorn.png);"></div>
                        <div class="delete"> <button class="delete">Delete</button> </div>
                        </section>`;

                $('#toWatch').prepend(currentMovie);
                let movieObj = {
                    movieid: imdbID,
                    poster: Poster
                }
                $.post("/api/watchlist", movieObj)
 //Example ajax get
    //$.get("/api/watchlist")
    //.then(function(result) {
    // do something with result
    //})

 //Example ajax Put
    // $.ajax({
    //     method: "PUT",
    //     url: "/api/watchlist/tt6751668"
    // }).then(function(response) {
    //     console.log(response);
    // })
  //Example ajax delete
    // $.ajax({
    //     method: "DELETE",
    //     url: "/api/watchlist/tt6751668"
    // }).then(function(response) {
    //     console.log(response);
    // })






            }
        });
    };
    $(document.body).on('click', '.delete', function () {
        $(this).parent().parent().remove();
    });

    $(document.body).on('click', '.watched', function () {
        let movie = $(this).parent().detach();
        $('#seen').prepend(movie);
    });
});