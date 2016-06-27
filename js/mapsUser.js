var destinations = [];
var markersArray = [];
var endTime = 0;
var endDistance = 0;
var map;
var dr;

function mapsLoad(){
	//window.onload = function(){
		destinations = [];
		markersArray = [];
		endTime = 0;
		endDistance = 0;
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: new google.maps.LatLng(40.461843, -3.689006),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		google.maps.event.addListener(map, "click", function(event) {
			var lat = event.latLng.lat();
			var lng = event.latLng.lng();
			//array con los puntos a los que van las lineas
			var newpoint = {"lat": lat, "lng": lng};
			destinations.push(newpoint);

			points(event, map);
			//poliLyne(event, map);
			if(destinations.length > 1){
				route(event, map);
				var endArray = destinations.length -1;
				distanceFull(destinations[endArray-1], destinations[endArray])
			}
		});
	//}
}

function points(event, map){
	var lat = event.latLng.lat();
	var lng = event.latLng.lng();
	var pinIcon = new google.maps.MarkerImage(
		"./img/serdo.gif",
		null, /* size is determined at runtime */
		null, /* origin is 0,0 */
		null, /* anchor is bottom center of the scaled image */
		new google.maps.Size(50, 50)
		);
	var infowindow = new google.maps.InfoWindow();
	var marker;
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		icon: './img/serdo.gif',
		draggable: true,
		animation: google.maps.Animation.DROP,
		title: "checkpoint"
	});
	marker.setIcon(pinIcon);
	//para el hide y el show de las marcas
	markersArray.push(marker);
	if (markersArray.length > 2){
		deleteLastMarker();
	}

	marker.addListener('click', toggleBounce(marker));
}

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

/*function poliLyne(event, map){
		

		//estilos de la linea
		var polyline = new google.maps.Polyline({
		path: destinations,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
		});
		
		polyline.setMap(map);

		//contructor de multilineas
		var currentPath = polyline.getPath();
		currentPath.push(event.latLng);
	}*/

	function route(event, map){

		var og = destinations.length - 2;

		var lastmap = new google.maps.LatLng(destinations[og].lat, destinations[og].lng);
		var nowmap = new google.maps.LatLng(destinations[destinations.length-1].lat, destinations[destinations.length-1].lng);

		var obConfigDR = {
			map: map,
			suppressMarkers: true
		}

		var obConfigDS = {
			origin: lastmap,
			destination: nowmap,
			travelMode: google.maps.TravelMode.WALKING
		}

		var ds = new google.maps.DirectionsService();
		dr = new google.maps.DirectionsRenderer(obConfigDR);

		ds.route(obConfigDS, fnRoute);

		function fnRoute(results, status){
			if (status == "OK"){
				dr.setDirections(results);
			} else {
				alert("Not found");
			}
		}
	}

	function distanceFull(origin, end) {

		var origin2 = '';
		var destinationA = '';

		var destinationIcon = './img/serdo.gif';
		var originIcon = './img/serdo.gif';

		//var geocoder = new google.maps.Geocoder;

		var service = new google.maps.DistanceMatrixService;
		service.getDistanceMatrix({
			origins: [origin, origin2],
			destinations: [destinationA, end],
			travelMode: google.maps.TravelMode.WALKING,
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false
		}, function(response, status) {
			if (status !== google.maps.DistanceMatrixStatus.OK) {
				alert('Error was: ' + status);
			} else {
				var originList = response.originAddresses;
				var destinationList = response.destinationAddresses;
				var outputDiv = document.getElementById('output');
				outputDiv.innerHTML = '';

				for (var i = 0; i < originList.length; i++) {
					var results = response.rows[i].elements;
					//geocoder.geocode({'address': originList[i]});
					for (var j = 0; j < results.length - 1; j++) {
						//geocoder.geocode({'address': destinationList[j+1]});
						if(results[j+1].status == "OK"){
							var totalTime = results[j+1].duration.text;
							endTime = endTime + getEndTime(totalTime);
							var totalDistance = results[j+1].distance.text;
							endDistance = endDistance + getEndDistance(totalDistance);
							outputDiv.innerHTML += 'Has recorrido ' + endDistance.toFixed(2) + ' km en ' + endTime + ' min <br>';
							//outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j+1] + ': ' + results[j+1].distance.text + ' in ' + results[j+1].duration.text + '<br>';
						}
					}
				}
			}
		});
	}

	function getEndTime(totalTime){
		var posTime = totalTime.indexOf(" ");
		totalTime = totalTime.substr("0", posTime);
		totalTime = parseInt(totalTime);
		totalTime = parseInt(totalTime * 0.4);
		return totalTime;
	}

	function getEndDistance(totalDistance){
		var posDistance = totalDistance.indexOf(" ");
		totalDistance = totalDistance.substr("0", posDistance);
		totalDistance = totalDistance.replace(",", ".");
		totalDistance = parseFloat(totalDistance);
		return totalDistance;
	}

	function closeRoute(){
		var newpoint = {"lat": destinations[0].lat, "lng": destinations[0].lng};
		destinations.push(newpoint);

	//poliLyne(event, map);
	if(destinations.length > 1){
		route(event, map);
		var endArray = destinations.length -1;
		distanceFull(destinations[endArray-1], destinations[endArray])
	}
	deleteAllMarkers();
}

function saveRoute(){
	$(".hideClass").attr('style', 'display: block');
}

function acceptRoute(){
	var nameRoute = document.getElementById("inputRoute").value;
	var actualUser = JSON.parse(window.sessionStorage.getItem('user'));
	var key = actualUser.dni;
	var found = 0;
	if (nameRoute !== ""){
		$.ajax({
			type: "GET",
			url: "./files/Routes.json",
			success: function(response){
				var myArray = response;
				for(i = 0; i < myArray.length; i++){
					if(myArray[i].name == nameRoute){
						found = 1;
					}
				}
				if (found == 0){
					$.ajax({
						type: "POST",
						url: "./insert_route.php",
						data: {"action":"write", "file": "./files/Routes.json", "name": nameRoute, "route": destinations, "key": key},
						success: function(msg){
							$(".routeSaved").show( "blind", {direction: "up"}, 1000 );
							setTimeout(function() {
								$(".routeSaved").fadeOut(1500);
							},3000);	
							$(".hideClass").attr('style', 'display: none');
							document.getElementById("inputRoute").value = "";
							destinations = [];
						},
						error: function(err){
							alert(err);
						}
					});
				} else {
					alert ("Ese nombre ya esta en uso");
				}
			}
		});
	}
}

function emptyRoute(){

	var origin2 = '';
	var destinationA = '';

	var service = new google.maps.DistanceMatrixService;
	service.getDistanceMatrix({
		origins: [destinations[destinations.length-1], origin2],
		destinations: [destinationA, destinations[destinations.length-2]],
		travelMode: google.maps.TravelMode.WALKING,
		unitSystem: google.maps.UnitSystem.METRIC,
		avoidHighways: false,
		avoidTolls: false
	}, function(response, status) {
		if (status !== google.maps.DistanceMatrixStatus.OK) {
			alert('Error was: ' + status);
		} else {
			var originList = response.originAddresses;
			var destinationList = response.destinationAddresses;
			var outputDiv = document.getElementById('output');
			outputDiv.innerHTML = '';

			for (var i = 0; i < originList.length; i++) {
				var results = response.rows[i].elements;
				//geocoder.geocode({'address': originList[i]});
				for (var j = 0; j < results.length - 1; j++) {
					//geocoder.geocode({'address': destinationList[j+1]});
					if(results[j+1].status == "OK"){
						var totalTime = results[j+1].duration.text;
						endTime = endTime - getEndTime(totalTime);
						var totalDistance = results[j+1].distance.text;
						endDistance = endDistance - getEndDistance(totalDistance);
						outputDiv.innerHTML += 'Has recorrido ' + endDistance.toFixed(2) + ' km en ' + endTime + ' min <br>';
						//outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j+1] + ': ' + results[j+1].distance.text + ' in ' + results[j+1].duration.text + '<br>';
					}
				}
			}
		}
	});
	
	dr.setMap(null);
	destinations.splice(destinations.length-1, 1);
	deleteLastMarker();

}

function deleteLastMarker() {
	markersArray[1].setMap(null);
	markersArray.splice(1,1);
}

function deleteAllMarkers() {
	for (var i = 0; i < markersArray.length; i++) {
		markersArray[i].setMap(null);
	}
	markersArray = [];
}