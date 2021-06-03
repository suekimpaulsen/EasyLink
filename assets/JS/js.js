getModalInputInfo = () => {
	//store input values into vraiables
	var name = $('input[type="text"]').val();
	var email = $('input[type="email"]').val();
	var age = $('input[id="age"]').val();
	var cuisineType = $('#cuisine-type').val();
	var bars = $('#bar-options').val();
	

	//turn variables into objects
	var currentInfo = {
		name: name,
		email: email,
		age: age,
		options: [cuisineType]
	}

	if (bars) {
		currentInfo.options.push('bar');
	}

	saveAboutYou(currentInfo)
	
}

saveAboutYou = (currentInfo) => {
	//create array
	var aboutYouInfo = [];

	// add form information to array
	aboutYouInfo.push(currentInfo);

	//save newest information to local storage
	localStorage.setItem('about-you', JSON.stringify(aboutYouInfo));

	clearScreen();

	initMap(aboutYouInfo);
}

clearScreen = () => {
	$('.card-container').remove();
}

// map of activiteies pulls up 
let map;
let service;
let infowindow;
var request;
var marker = [];

initMap = (aboutYouInfo) => {
	map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 36.1627, lng: -86.7816 },
    zoom: 12,
  });

  	var aboutYouInfo = JSON.parse(localStorage.getItem('about-you'));

  	if(aboutYouInfo) {
		for(i = 0; i < aboutYouInfo[0].options.length; i++) { 
			searchForPlaces(aboutYouInfo[0].options[i]);
		}
	}
}

searchForPlaces = (currentOption) => {
	request = {
		location: { lat: 36.1627, lng: -86.7816 },
		radius: 5000,
		keyword: currentOption,
		openNow: 'true',
		rankby: 'prominence'
	}
  
	service = new google.maps.places.PlacesService(map);
  
	service.nearbySearch(request, placeMarkersOnMap);
  
	google.maps.event.addListener(map, 'rightclick', (e) => {
		map.setCenter(e.latLng);
		clearResults(markers);
  
		var request = {
			location: e.latLng,
			radius: 5000,
			keyword: currentOption
		}
		service.nearbySearch(request, placeMarkersOnMap);
	})
	infowindow = new google.maps.InfoWindow();
}

createCardsFromApi = (results) => {

	//create container to hold all cards
	cardContainer = document.createElement('div');
	cardContainer.classList = 'card-container';
	$('#results').append(cardContainer);

					
	var card = document.createElement('div');
		$(card).addClass('card columns').appendTo(cardContainer)

	var cardContent = document.createElement('div');
		$(cardContent).addClass('card-content').appendTo(card)

	var cardTitle = document.createElement('p')
		$(cardTitle).addClass('title')
		.html(results[0].name);

	var cardDetail = document.createElement('p')
		$(cardDetail).addClass('subtitle')
		.html(results[0].vicinity);
		cardContent.append(cardTitle, cardDetail)

}

placeMarkersOnMap = (results, status) => {

	if(status == google.maps.places.PlacesServiceStatus.OK) {
		for(i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
		createCardsFromApi(results);
	}
	
}

createMarker = (place) => {

	marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
	
	google.maps.event.addListener(marker, 'click', (e) => {
		var placeDetail = "<b>" + place.name + "</b> <br/>" + place.vicinity;
		infowindow.setContent(placeDetail);
		infowindow.setPosition(e.latLng);
    	infowindow.open(map);
	});
}

// CONTACT US
saveContactUs = () => {
	var cName = $('#contact-us-name').val()
	var cEmail = $('#contact-us-email').val()
	var cExperience = $('#are-you-happy').val()
	var cMessage = $('#message').val()


	console.log('apples')
	var contactUsForm = {
		name: cName,
		email: cEmail,
		expirence: cExperience,
		message: cMessage
	}
	//pull down from local storage
	var savedContactUsInfo = JSON.parse(localStorage.getItem('contact-us')) || [];

	//push new content to local storage
	savedContactUsInfo.push(contactUsForm)

	//save to local storage
	localStorage.setItem('contact-us', JSON.stringify(savedContactUsInfo))

}


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

$('#save-changes').click(getModalInputInfo);
$('#submitBtn').click(saveContactUs)