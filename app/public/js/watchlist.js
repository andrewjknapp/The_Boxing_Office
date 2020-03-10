
$(document).ready(function () {
    $('#searchBtn').on('click', async function (event) {
        let search = $('#searchText').val();
        let data = await movieSearch(search);

    });
    
    //loop through movie ids and call moviesearch 
    displayMovies();

    $(document.body).on('click', '.delete', function (event) {
        $(this).parent().parent().remove();
        let imdbID = event.target.getAttribute('id');
        $.ajax({
            method: "DELETE",
            url: "/api/watchlist/" + imdbID,
            success: function() {
                displayMovies();
            }
        })
    });

    $(document.body).on('click', '.watched', function () {
        let movie = $(this).parent();

        //$('#seen').prepend(movie);
        imdbID = movie.attr('movieid');
        $.ajax({
            method: "PUT",
            url: "/api/watchlist/" + imdbID,
            success: function(data) {
                displayMovies();
            } 
        })
    });

});

function movieSearch(searchString) {
    let queryURL = `https://omdbapi.com/?apikey=trilogy&t=${searchString}`;
    $.ajax({
        url: queryURL
    }).then(function (response) {
        let { Poster, Title, Year, Plot, imdbID } = response;

        addToWatchlist(response);
        let movieObj = {
            movieid: imdbID,
            poster: Poster
        }

        $.post("/api/watchlist", movieObj)
    });
};

function addToWatchlist(response) {
    if (response !== null) {

        console.log(response);
        let { Poster, Title, Year, Plot, imdbID } = response;

        let currentMovie =
            `<section class='watchlistInfo'>
            <div class="poster" style="background-image: url(${Poster});"></div>
            <div class="title"><h3>${Title}  (${Year})</h3></div>
            <div class="plot">${Plot}</div>
            <div class="watched" style="background-image: url(assets/Popcorn.png);"></div>
            <div class="delete"> <button id=${imdbID} class="delete">Delete</button> </div>
            </section>`;

        $('#toWatch').prepend(currentMovie);
    }
}

function displayMovies() {
    $('#toWatch').empty();
    $('#seen').empty();
    $.get("/api/watchlist")
        .then(function (result) {

        for (i = 0; i < result.length; i++) {
            let movieID = result[i].movieid;
            let is_watched = result[i].is_watched;
            let queryURL = `https://omdbapi.com/?apikey=trilogy&i=${movieID}`;
            $.ajax({
                url: queryURL
            }).then(function (response) {
                if (response !== null) {

                    let { Poster, Title, Year, Plot, imdbID } = response;
        
                    let currentMovie =
                        `<section class='watchlistInfo' movieid=${imdbID}>
                    <div class="poster" style="background-image: url(${Poster});"></div>
                    <div class="title"><h3>${Title}  (${Year})</h3></div>
                    <div class="plot">${Plot}</div>
                    <div class="watched" style="background-image: url(assets/Popcorn.png);"></div>
                    <div class="delete"> <button id=${imdbID} class="delete">Delete</button> </div>
                    </section>`;

                    if(!is_watched) {
                        $('#toWatch').prepend(currentMovie);
                    } else {
                        $('#seen').prepend(currentMovie);
                    }
                } 
            });
        }
        });
}