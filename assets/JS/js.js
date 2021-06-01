fetchApiData = () => {
    
	clearScreen();
	
	var restaurantApi = 'https://api.documenu.com/v2/restaurants/search/geo?lat=36.16589&lon=-86.78444&distance=25&cuisine=italian&key=e3fb5dcdf4c00fbb833a184f0893222e'



    fetch(restaurantApi)
    .then((response) => {        
        return response.json();       
    })
    .then((response) => {
        
		console.log(response);

		//create container to hold all cards
		restaurantContainer = document.createElement('div');
		restaurantContainer.classList = 'practice';
		$('#results').append(restaurantContainer);

		for(i = 0; i < 4; i++) {
			//create individual restaurant containers
			createRestaurantEl = document.createElement('div');
			createRestaurantEl.classList = '';
			restaurantContainer.append(createRestaurantEl);

			//create restaurant card name
			restaurantTitle = document.createElement('h2');
			restaurantTitle.textContent = response.data[i].restaurant_name;
			restaurantTitle.classList = '';
			createRestaurantEl.append(restaurantTitle);

			//insert restaurant address
			restaurantAddress = document.createElement('h3');
			restaurantAddress.textContent = response.data[i].address.formatted;
			restaurantAddress.classList = '';
			createRestaurantEl.append(restaurantAddress);
		}
    })

	getModalInputInfo();
}

clearScreen = () => {
	$('.practice').remove();
}
// map of activiteies pulls up 
let map;
let service;
let infowindow;

function initMap() {
	infowindow = new google.maps.InfoWindow();
	map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 36.1627, lng: -86.7816 },
    zoom: 12,
  });

  var request = {
	  location: { lat: 36.1627, lng: -86.7816 },
	  radius: 40500,
	  types: ['restaurant'],
	  keyword: 'italian'
	  //openNow: 'true'
  }

  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);
}

callback = (results, status) => {

	if(status == google.maps.places.PlacesServiceStatus.OK) {
		for(i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

createMarker = (place) => {

	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
	console.log(place);
	google.maps.event.addListener(marker, 'click', () => {
		infowindow.setContent(place.name || "");
    	infowindow.open(map);
	});
}

// when you click get started button
// about you modal pops up



// ACTIVITES
// after fill out the form and hit save
// activities page shows up
// select the options that are given

getModalInputInfo = () => {
	//store input values into vraiables
	var name = $('input[type="text"]').val();
	var email = $('input[type="email"]').val();

	//turn variables into objects
	var currentInfo = {
		name: name,
		email: email
	}

	saveAboutYou(currentInfo)
}


saveAboutYou = (currentInfo) => {
	//create array
	var aboutYouInfo = [];

	// add form info to leaderboard
	aboutYouInfo.push(currentInfo);

	//add newest information to local storage
	localStorage.setItem('about-you', JSON.stringify(aboutYouInfo));
}



// REVIEWS
// list out the options that were selected in the activities page


// RESULTS
// shows a map
// recommend places to go



// CONTACT US


// NAVBAR-BURGER
// directs to its page when clicked




class BulmaModal {
	constructor(selector) {
		this.elem = document.querySelector(selector)
		this.close_data()
	}
	
	show() {
		this.elem.classList.toggle('is-active')
		this.on_show()
	}
	
	close() {
		this.elem.classList.toggle('is-active')
		this.on_close()
	}
	
	close_data() {
		var modalClose = this.elem.querySelectorAll("[data-bulma-modal='close'], .modal-background")
		var that = this
		modalClose.forEach(function(e) {
			e.addEventListener("click", function() {
				
				that.elem.classList.toggle('is-active')

				var event = new Event('modal:close')

				that.elem.dispatchEvent(event);
			})
		})
	}
	
	on_show() {
		var event = new Event('modal:show')
	
		this.elem.dispatchEvent(event);
	}
	
	on_close() {
		var event = new Event('modal:close')
	
		this.elem.dispatchEvent(event);
	}
	
	addEventListener(event, callback) {
		this.elem.addEventListener(event, callback)
	}
}

var btn = document.querySelector("#btn")
var mdl = new BulmaModal("#myModal")

btn.addEventListener("click", function () {
	mdl.show()
})

mdl.addEventListener('modal:show', function() {
	console.log("opened")
})

mdl.addEventListener("modal:close", function() {
	console.log("closed")
})

$('#save-changes').click(fetchApiData);