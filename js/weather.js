function go(){
	var city = $("#searchCity").val();
	loadWeather(city ,"");
}


function loadWeather(location, woeid){
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather){
			city = weather.city;
			temp = weather.temp + '&deg;';
			wcode = '<img class="weathericon" src="img/images/weathericons/' + weather.code + '.svg">';
			wind = '<p>' + weather.wind.speed + '</p><p>' +weather.units.speed + '</p>';
			humidity = weather.humidity + ' %';

			$(".location").text(city);
			$(".temperature").html(temp);
			$(".climate_bg").html(wcode);
			$(".windspeed").html(wind);
			$(".humidity").text(humidity);
		},
		
		error: function(error){
			$('.error').html('<p>' + error + '</p>');
		}
	});
}