var generalRoute = [];
var mapGlobal;

function showListMaps(){
	var arrayList = [];
	$.ajax({
		type: 'GET',
		url: './files/Routes.json',
		crossDomain: true,
		jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'json',
		success: function(response) {
			arrayList = response;
			$("#routeList").empty();
			for (var i = 0; i < arrayList.length; i++){
				$("#routeList").append('<li class="routeClass" onClick="paintMap(\'' + arrayList[i].name + '\')">' + arrayList[i].name + '</li>');
			}
		}
	});
	createMap();
}

function createMap(){
	mapGlobal = new google.maps.Map(document.getElementById('mapGlobal'), {
		zoom: 15,
		center: new google.maps.LatLng(40.461843, -3.689006),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
}



function paintMap(name){
	createMap();
	var arrayRoute = [];
	$.ajax({
		type: 'GET',
		url: './files/Routes.json',
		crossDomain: true,
		jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'json',
		success: function(response) {
			arrayRoute = response;
			for (var i = 0; i < arrayRoute.length; i++) {
				if(name === arrayRoute[i].name){
					var coor = arrayRoute[i].route;
					generalRoute = coor;
					for (i = 1; i < generalRoute.length; i++){

						paintRoute(mapGlobal, i);
					}
				}
			};
			
		}
	});
}

function paintRoute(mapGlobal, i){
	//var og = generalRoute.length - 2;
	var lastmap = new google.maps.LatLng(generalRoute[i-1].lat, generalRoute[i-1].lng);
	var nowmap = new google.maps.LatLng(generalRoute[i].lat, generalRoute[i].lng);

	var obConfigDR = {
		map: mapGlobal,
		suppressMarkers: true
	}

	var obConfigDS = {
		origin: lastmap,
		destination: nowmap,
		travelMode: google.maps.TravelMode.BICYCLING
	}

	var ds = new google.maps.DirectionsService();
	var dr = new google.maps.DirectionsRenderer(obConfigDR);

	ds.route(obConfigDS, fnRoute);

	function fnRoute(results, status){
		if (status == "OK"){
			dr.setDirections(results);
		} else {
			alert("Not found");
		}
	}
}