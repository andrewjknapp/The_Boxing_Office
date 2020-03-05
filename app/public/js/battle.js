const fighter1 = {
    Title: "Blade Runner 2049",
    Metascore: "99",
    imdbVotes: "412,480",
    imdbID: "tt1856101",
    BoxOffice: "$91,800,042"
}

const fighter2 = {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Metascore: "92",
    imdbVotes: "1,568,706",
    imdbID: "tt0120737",
    BoxOffice: "$314,000,000"
}

let time = 2000;

function numberify(string) {
    let retStr = '';
    for(let i = 0; i < string.length; i++) {
        if(!isNaN(string[i])) {
            retStr += string[i];
        }
    }
    return Number(retStr);
}

function decider(movie1, movie2) {
    //R = Rating
    console.log(movie1);
    let R1 = numberify(movie1.Metascore);
    let R2 = numberify(movie2.Metascore);
    let Rtot = numberify(movie1.Metascore) + numberify(movie2.Metascore);
    let Rweight = 0.5;

    //P = Popularity
    let P1 = numberify(movie1.imdbVotes);
    let P2 = numberify(movie2.imdbVotes);
    let Ptot = numberify(movie1.imdbVotes) + numberify(movie2.imdbVotes);
    let Pweight = 0.25;

    //Bo = Box Office
    let Bo1 = numberify(movie1.BoxOffice);
    let Bo2 = numberify(movie2.BoxOffice);
    let Botot = numberify(movie1.BoxOffice) + numberify(movie2.BoxOffice);
    let Boweight = 0.25;

    //S = score outcome
    let S1 = Rweight*(R1/Rtot) + Pweight*(P1/Ptot) + Boweight*(Bo1/Botot);
    let S2 = Rweight*(R2/Rtot) + Pweight*(P2/Ptot) + Boweight*(Bo2/Botot);

    if(S1 > S2) {
        return 1;
    } else {
        return 2;
    }
}
let round = 1;
$('#fight-bet').on('click', function(event) {
    //console.log('Clicked');
    console.log(round);
    if (round <= 3) {

        roundDeclaration(round);

        if(round === 3) {
            $('#fight-bet').css('opacity', 0);
            setTimeout(function() {
                $('#round-results').css('opacity', 0);
                winner(
                    decider(fighter1, fighter2)
                );
                $('#fight-bet').css('opacity', 1);
            }, time*3)
        }
        round++;
    } 
})

function roundDeclaration(num) {
    let rounds = ['Critic Rating', 'imdb Votes', 'Box Office'];
    let betText = ['Continue?', 'Final Round', 'Winner'];
    let results = ['Metascore', 'imdbVotes', 'BoxOffice'];

    let currentRound = 
    `
    <h2 class="round">Round ${num}</h2>
    <hr class="round">
    <h4 class="round">${rounds[num - 1]}</h4>
    `

    $('#bet-text').css('opacity', 0);
    $('#bet-text').text(betText[num - 1]);
    $('#round-info').append(currentRound);
    $('#round-info').css('opacity', 1);
    

    setTimeout(function() {
        $('#round-info').css('opacity', 0);
        $('#round-info').empty();
       
        
        attack();
        setTimeout(function() {
            $('#bet-text').css('opacity', 1);

            let data1 = fighter1[results[num - 1]];
            let data2 = fighter2[results[num - 1]];

            let winner;
            if (roundWinner(data1, data2) === 1) {
                winner = fighter1.Title;
            } else {
                winner = fighter2.Title;
            }

            $('#category').text(`${winner} is the winner of this round!`)
            $('#res1').text(`${results[num - 1]}: ${data1}`);
            $('#res2').text(`${results[num - 1]}: ${data2}`);
            $('#round-results').css('opacity', 1);
        }, time);
    }, time);
}

function winner(result) {
    if (result === 1) {
        $('#movie2').animate({
            right: '-100%',
            bottom: '-50%'
        }, 1000);

        setTimeout(function() {
            $('#movie2').css('opacity', 0);
        }, 800);

        $('#movie1').animate({
            left: '42%'
        }, 'slow');

    } else {
        $('#movie1').animate({
            left: '-100%'
        }, 1000);

        setTimeout(function() {
            $('#movie1').css('opacity', 0);
        }, 800);

        $('#movie2').animate({
            left: '42%'
        }, 'slow');
    }
    $('.fireworks').css('opacity', 1);
}

function attack() {

    $('#round-results').css('opacity', 0);

    $('#movie1').css('animation-duration', '1s');
    $('#movie2').css('animation-duration', '1s');

    $('#movie1').animate({
        left: '40%'
    }, 'fast');
    $('#movie2').animate({
        right: '40%'
    }, 'fast')
    $('#explosion').css('opacity', '1');

    setTimeout(function() {
        $('#movie1').animate({
            left: '5%'
        }, 'fast');
        $('#movie2').animate({
            right: '5%'
        }, 'fast');
        $('#explosion').css('opacity', '0');
        $('#movie1').css('animation-duration', '2s');
        $('#movie2').css('animation-duration', '2s');
    }, time)
}

function roundWinner(num1, num2) {
    return numberify(num1) > numberify(num2) ? 1 : 2;
}


const watchlist1 = [
    {
        userID: 3,
        imdbID: "tt6751668",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
    },
    {
        userID: 3,
        imdbID: "tt1612774",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTU2Nzg2NDQ2Nl5BMl5BanBnXkFtZTcwMDk5MjMzNA@@._V1_SX300.jpg"
    },
    {
        userID: 3,
        imdbID: "tt0133093",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    },
    {
        userID: 3,
        imdbID: "tt1856101",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg"
    },
    {
        userID: 3,
        imdbID: "tt0120737",
        Poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"
    },
    {
        userID: 3,
        imdbID: "tt5580390",
        Poster: "https://m.media-amazon.com/images/M/MV5BNGNiNWQ5M2MtNGI0OC00MDA2LWI5NzEtMmZiYjVjMDEyOWYzXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"
    }
]

function populateWatchlist(watchlist) {
    $('#watchlist').html("")
    for(let i = 0; i < watchlist.length; i++) {
        let currentMovie = 
        `
        <div class="movie_watchlist" 
        imdbID=${watchlist[i].imdbID}
        style="background-image: url('${watchlist[i].Poster}');"></div>

        `;
        console.log(currentMovie);
        $('#watchlist').append(currentMovie);
    }
}

populateWatchlist(watchlist1);