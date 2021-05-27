
getLocation = () => {

    navigator.geolocation.getCurrentPosition((position) => {
        storeLoactionData(position)
    });

}

//get coordinates of user's location
storeLoactionData = (position) => {
    latitude = position.coords.latitude

    longitude = position.coords.longitude

    console.log(latitude)
    console.log(longitude);
    fetchApiData();
}

fetchApiData = () => {
    
    var restaurantApi = 'https://api.documenu.com/v2/restaurants/search/geo?lat=' + latitude + 
    '&lon=' + longitude + 
    '&distance=15&size=15&key=e3fb5dcdf4c00fbb833a184f0893222e'


    fetch(restaurantApi)
    .then((response) => {
        console.log(response);
        
        return response.json();      
        
    })
    .then((response) => {
        console.log(response);
    })

}



$('#get-started').click(getLocation);