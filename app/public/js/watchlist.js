
$(document).ready(function () {
    $('#searchBtn').on('click', async function (event) {
        let search = $('#searchText').val();
        let data = await movieSearch(search);

    });
    
    //loop through movie ids and call moviesearch 
    displayMovies();

    $(document.body).on('click', '.delete', function (event) {
        $(this).parent().remove();
        let imdbID = event.target.getAttribute('id');
        $.ajax({
            method: "DELETE",
            url: "/api/watchlist/" + imdbID,
            success: function() {
                //displayMovies();
                //location.reload();
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
            `<section class='watchlistInfo' movieid=${imdbID}>
                <div class="poster" style="background-image: url(${Poster});"></div>
                <div class="title">${Title}  (${Year})</div>
                <div class="plot">${Plot}</div>`;
                if(is_watched) {
                    currentMovie += `<div class="watched popcorn" style="background-image: url(assets/Popcorn.png);"`
                } else {
                    currentMovie += `<div class="watched kernel" style="background-image: url(assets/corn-kernel.png);"`               
                 }
                currentMovie += `></div>
                <div class="delete" id=${imdbID}>Delete</div>
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
                if (response !== null || response !== undefined) {

                    let { Poster, Title, Year, Plot, imdbID } = response;
        
                    let currentMovie =
                    `<section class='watchlistInfo' movieid=${imdbID}>
                        <div class="poster" style="background-image: url(${Poster});"></div>
                        <div class="title">${Title}  (${Year})</div>
                        <div class="plot">${Plot}</div>`;
                        if(is_watched) {
                            currentMovie += `<div class="watched popcorn" style="background-image: url(assets/Popcorn.png);"`
                        } else {
                            currentMovie += `<div class="watched kernel" style="background-image: url(assets/corn-kernel.png);"`               
                         }
                        currentMovie += `></div>
                        <div class="delete" id=${imdbID}>Delete</div>
                    </section>`;

                    //<button id=${imdbID} class="delete"></button>
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