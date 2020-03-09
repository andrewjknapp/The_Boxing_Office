
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
                console.log(movieObj);
                $.post("/api/watchlist", movieObj)
                //loop through movie ids and call moviesearch 
                // $.get("/api/watchlist")
                //     .then(function (result) {
                //         console.log(result);
                //     });
            }
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
    $('#delete').on('click', function () {
        $.ajax({
            method: "DELETE",
            url: "/api/watchlist/" + imdbID
        }).then(function (response) {
            console.log(response);
        });
    });
    $(document.body).on('click', '.delete', function () {
        $(this).parent().parent().remove();
    });

    $(document.body).on('click', '.watched', function () {
        let movie = $(this).parent().detach();
        $('#seen').prepend(movie);
    });
});