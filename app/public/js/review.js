$(document).ready(function() {

    // $('#page-start').on('click', function(event) {
    //     if(event.target.id === "make-review") {

    //         hideStart();

    //     } else if(event.target.id === "view-review") {
    //         hideStart();
    //         showSearch();
    //     }
    // })

    $('form').on('submit', function(event) {
        event.preventDefault();
        let reviewType = $('#searchBy').val()
        
        let searchText = $('#search-text').val();

        let search = {
            reviewType: reviewType,
            searchText: searchText
        }

        $.get('/api/review', search)
        .then(function(response) {
            console.log(response);
        })
    })


})

function hideStart() {
    $('#start-modal').addClass('hide');
}

function showSearch() {
    $('#search-modal').removeClass('hide');
}