$(document).ready(function() {
    // $('body').on('click',function(event) {
    //     console.log(event.target);
    // })

    $.post('/api/review/request', 0)
    .then(function(response) {
        populateReviewList(response);
    })

    $('form').on('submit', function(event) {
        event.preventDefault();
        let reviewType = $('#searchBy').val()
        
        let searchText = $('#search-text').val();

        let search = {
            reviewType: reviewType,
            searchText: searchText
        }
        
        $.post('/api/review/request', search)
        .then(function(response) {
            populateReviewList(response);
        })
    })

    $('#make-review').on('click', function(event) {
        $('#movie-check').addClass('hide');
        $('#movie-search').val('');
        $('#new-modal').removeClass('hide');
    })

    $('#new-modal').on('click', function(event) {
        if(event.target.id === 'new-modal' || event.target.id === 'new-review') {
            if(confirm("Do you want to quit editing? Work not sumbitted will be lost.")) {
                resetReviewModal();
            };
        }
    })

    $('#movieSearchBtn').on('click', async function(event) {

        let searchText = $('#movie-search').val();

        if(searchText !== '') {
            let data = await movieSearch(searchText);
            if(data.Title === undefined) {
                alert("Unable to find movie, try another");
            } else {
                $('#poster').css('background-image', `url('${data.Poster}')`);
                if($('#movie-check').hasClass('hide')) {
                    $('#movie-check').removeClass('hide');
                }
               
                $('#movie-name').attr('movie_name', data.Title);
            }
        }

    })

    $('#new-confirm').on('click', function(event) {
        $('#review-movie-chooser').addClass('hide');
        $('#movie-check').addClass('hide');
        $('#review-editor').removeClass('hide');

    })

    $('#submit-new-review').on('click', function(event) {
        let newReview = {
            movie_name: $('#movie-name').attr('movie_name'),
            title: $('#review-title').val(),
            text: $('#review-text').val()
        }
        $.post('/api/review', newReview)
        .then(function(response) {
           
        });
        resetReviewModal();
        location.reload();
    })

    $('#found-reviews').on('click', function(event) {
        if(event.target.matches('article')) {
            $.get(`/api/review/${event.target.getAttribute('reviewID')}`)
            .then(function(response) {
                
                $('#prev-movie-title').text(response.movie_name);
                $('#prev-user').text(response.user_name);
                $('#prev-review-title').text(response.review_title);
                $('#prev-review-text').text(response.review_text);
            })
            $('#view-review-modal').removeClass('hide');
        } else if (event.target.matches('p')) {
            $.get(`/api/review/${event.target.parentElement.getAttribute('reviewID')}`)
            .then(function(response) {
                
                $('#prev-movie-title').text(response.movie_name);
                $('#prev-user').text(response.user_name);
                $('#prev-review-title').text(response.review_title);
                $('#prev-review-text').text(response.review_text);
            })
            $('#view-review-modal').removeClass('hide');
        }
    })

    $('#view-review-modal').on('click', function(event) {
        if(event.target.id === 'view-review-modal') {
            $('#view-review-modal').addClass('hide');
        }
    })
})

function populateReviewList(arr) {

    $('#found-reviews').empty();

    for(let i = 0; i < arr.length; i++) {
        let currentReview = 
        `
        <article class="review" reviewID="${arr[i].id}">
        <p>${arr[i].review_title} | </p>
        <p>${arr[i].movie_name}</p>
        <p class="user">${arr[i].user_name}</p>
        </article>
        `

        $('#found-reviews').prepend(currentReview);
    }

}

function resetReviewModal() {
    $('#new-modal').addClass('hide');
    $('#review-movie-chooser').removeClass('hide');
    $('#review-editor').addClass('hide');
    $('#review-title').val('');
    $('#review-text').val('');
}

function movieSearch(searchString) {
    let queryURL = `http://omdbapi.com/?apikey=trilogy&t=${searchString}`;

    return new Promise((resolve, reject) => {
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
            
            resolve(searchResp);
        }
        })
        .catch(function(result) {
            reject(-1);
        })
    })
}