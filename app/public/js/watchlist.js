
$(document).ready(function () {
    //$('#toWatch').empty();
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
            let { Poster, Title, Year, Plot, imdbID } = response;
            console.log(Title);
            addToWatchlist(response);
            let movieObj = {
                movieid: imdbID,
                poster: Poster
            }
            console.log(movieObj);
            $.post("/api/watchlist", movieObj)
        });
    };
    $('#watched').on('click', function () {
        $.ajax({
            method: "PUT",
            url: "/api/watchlist/" + imdbID
        }).then(function (response) {
            console.log(response);
        })
    });
    //loop through movie ids and call moviesearch 
    $.get("/api/watchlist")
        .then(function (result) {
            console.log(result);
            for (i = 0; i < result.length; i++) {
                let movieID = result[i].movieid;
                let queryURL = `http://omdbapi.com/?apikey=trilogy&i=${movieID}`;
                $.ajax({
                    url: queryURL
                }).then(function (response) {
                    if (response !== null) {
                        console.log(response);
                        let { Poster, Title, Year, Plot, imdbID } = response;
                        console.log(Title);
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
                });
            }
        });
    $(document.body).on('click', '.delete', function (event) {
        $(this).parent().parent().remove();
        let imdbID = event.target.getAttribute('id');
        $.ajax({
            method: "DELETE",
            url: "/api/watchlist/" + imdbID
        }).then(function (response) {
            console.log(response);
        });
    });

    $(document.body).on('click', '.watched', function () {
        let movie = $(this).parent().detach();
        $('#seen').prepend(movie);
    });
    function addToWatchlist(response) {
        if (response !== null) {

            console.log(response);
            let { Poster, Title, Year, Plot, imdbID } = response;
            console.log(Title);
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

});