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
		var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFE7569';
		if(city.yearRank == 1){
			icon = 'img/1.png';
		}else if(city.yearRank == 39){
			icon = 'img/atl.png';
		}
		// set lat/lon for city
		var cityLatlng = {lat: city.lat, lng: city.lon};
		// create marker for city
		var marker = new google.maps.Marker(
			{
				position: cityLatlng,
				map: map,
				title: city.city,
				icon: icon
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

	// function that allows clicking on city text links to simulate a marker being clicked
	$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index],"click");
	}

	// make the cities array available to the DOM
	$scope.cities = cities;

	// loop through the cities array and create a marker for each city object 
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

	// function to display the traffic layer
	$scope.showTraffic = function(){
		var trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(map);
	}

	$scope.updateMarkers = function(){
		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		for(var i = 0; i < $scope.filteredCities.length; i++){
			createMarker($scope.filteredCities[i]);
		}
	}

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('list-window'));
	directionsService.route({
		origin: 'Atlanta, GA',
		destination: 'New York, NY',
		travelMode: 'DRIVING'
	}, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});

});