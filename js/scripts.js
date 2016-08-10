var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller('googleMapsController', function($scope, $http){

	// set starting lat/lon for map 
	var myLatlng = {lat: 40.000, lng: -98.000};

	// create new map centered on starting lat/lon, w/ zoom level 4
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatlng
	});

	// create empty array to store markers for future reference
	var markers = [];

	// function to create markers and associated info windows/click listeners
	function createMarker(city){
		// log city object to the window
		console.log(city);
		// set lat/lon for city
		var cityLatlng = {lat: city.lat, lng: city.lon};
		// create marker for city
		var marker = new google.maps.Marker(
			{
				position: cityLatlng,
				map: map,
				title: city.city
			}
		);
		// create info window for city
		var infoWindow = new google.maps.InfoWindow({
          content: city.city
        });
		// add click listener to city marker
        google.maps.event.addListener(marker, 'click', function(){
        	infoWindow.open(map, marker);
        });
        // push marker to markers array
        markers.push(marker);
	}

	// function that allows city text to simulate a marker being clicked
	$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index],"click");
	}

	// make the cities array available to the DOM
	$scope.cities = cities;

	// loop through the cities array and create a marker for each city object 
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

});