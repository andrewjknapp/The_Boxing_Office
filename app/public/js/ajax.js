$(document).ready(function() {
    function movieSearch(searchString) {
        let queryURL = `http://omdbapi.com/?apikey=trilogy&t=${searchString}`;

        $.ajax({
            url: queryURL
        }).then(function(response) {
            if (response !== null) {
                let searchArray = [];
                let len = response.length;
                for (let i=0; i < len; i++) {
                    searchArray.push(response[i].imdbID);
                }
                // movieArray is an array of imdbID's

                let arrayLength = searchArray.length;

                if (arrayLength === 0) {
                    return;
                }

                // // empty out the result section first
                // $("#results").empty();



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
                BoxOffice: movie.BoxOffice
            }
        return searchResp;

          })
}

    function generateMovieFighter(imdbID) {
        let queryURL = `http://omdbapi.com/?apikey=trilogy&i=${imdbID}`;

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(resp) {
            let movie = resp;
            console.log(movie);

            let title = movie.Title;
           
            let FighterResp = {
                Title: title,
                Metascore: movie.Metascore,
                imdbVotes: movie.imdbVotes,
                imdbID: movie.imdbID,
                Poster: movie.Poster,
                BoxOffice: movie.BoxOffice
            }
           
            console.log(title);

            return FighterResp;

    });
}

    generateMovieListing('tt1856101');
    movieSearch('Millers-Crossing');
    generateMovieFighter('tt1856101');
});
