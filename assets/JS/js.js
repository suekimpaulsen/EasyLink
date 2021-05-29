fetchApiData = () => {
    
    var restaurantApi = 'https://api.documenu.com/v2/restaurants/search/geo?lat=36.16589&lon=-86.78444&distance=25&size=15&key=e3fb5dcdf4c00fbb833a184f0893222e'


    fetch(restaurantApi)
    .then((response) => {        
        return response.json();       
    })
    .then((response) => {
        console.log(response);
    })
}

$('#get-started').click(fetchApiData);


// when you click get started button
// about you modal pops up



// ACTIVITES
// after fill out the form and hit save
// activities page shows up
// select the options that are given


// REVIEWS
// list out the options that were selected in the activities page


// RESULTS
// shows a map
// recommend places to go



// CONTACT US


// NAVBAR-BURGER
// directs to its page when clicked

