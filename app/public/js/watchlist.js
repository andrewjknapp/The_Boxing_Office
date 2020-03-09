
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
                // let movie = response;
                let { Poster, Title, Year, Plot } = response;
                let currentMovie =
                    `<section class='watchlistInfo'>
                        <div class="poster" style="background-image: url(${Poster});"></div>
                        <div class="title"><h3>${Title}  (${Year})</h3></div>
                        <div class="plot">${Plot}</div>
                        <div class="watched" style="background-image: url(assets/Popcorn.png);"></div>
                        </section>`;

                $('#toWatch').prepend(currentMovie);

            }
        });
    }

    $(document.body).on('click', '.watched', function(){
        let movie = $(this).parent().detach();
        $('#seen').prepend(movie);
    });

    function generateMovieListing(imdbID) {
        let queryURL = `http://omdbapi.com/?apikey=trilogy&i=${imdbID}`;

        return new Promise((resolve, reject) => {

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (resp) {
                let movie = resp;

                let title = movie.Title;
                let year = movie.Year;
                let runtime = movie.Runtime;
                let director = movie.Director;

                let searchResp = {
                    Title: title,
                    Year: year,
                    Director: director,
                    Runtime: runtime,
                    Metascore: movie.Metascore,
                    imdbVotes: movie.imdbVotes,
                    imdbID: movie.imdbID,
                    Poster: movie.Poster,
                    BoxOffice: movie.BoxOffice,
                    Plot: movie.Plot,
                    Awards: movie.Awards,
                    Actors: movie.Actors,
                    Genre: movie.Genre
                }
                console.log(searchResp);
                resolve(searchResp);

            })
        })
    }
});

//prepend

//reference watchlisy array