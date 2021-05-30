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

