$(document).ready(function() {
    function movieSearch(searchString) {
        let queryURL = `https://omdbapi.com/?apikey=trilogy&t=${searchString}`;

        $.ajax({
            url: queryURL
        }).then(function(response) {
            if (response !== null) {
                let movie = response;
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
                return searchResp;
            }
        })
    }
    function generateMovieListing(imdbID) {
        let queryURL = `http://omdbapi.com/?apikey=trilogy&i=${imdbID}`;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(resp) {
            let movie = resp;
            console.log(movie);

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
            return searchResp;

          })
}


    generateMovieListing('tt1856101');
    movieSearch('i heart huckabees');
});
