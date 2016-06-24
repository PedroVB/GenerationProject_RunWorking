function userAccess(){
	$.ajax({
		type: 'GET',
		url: './files/User.json',
		crossDomain: true,
		jsonpCallback: 'jsonCallback',
		contentType: "application/json",
		dataType: 'json',
		success: function(response) {
			var user = document.getElementById("userLogin").value;
			var pass = document.getElementById("passwordLogin").value;
			var found = 0;
			for (i = 0; i < response.length; i++) {
				if (user === response[i].user && pass === response[i].password) {
					var found = 1;
					$('.siteLogin').remove();
					window.sessionStorage.setItem('user', JSON.stringify(response[i]));
					$('#msgLogin').append("<div class='row'><div class='col-md-offset-3 col-md-6 col-md-offset-3'>" +
						"<p class='correct'>USUARIO Y CONTRASEÑA CORRECTOS</p></div></div>");
					$('#btnAccess').append('<div class="row btnCorrect"><div class="col-md-offset-3 col-md-6 col-md-offset-3">' +
						'<a href="/user"><button type="button" class="btn btn-primary" id="btnUser">Acceder</button></a>')
				}
			}
			if (found === 0){
				$(".incorrectUser").show( "blind", {direction: "up"}, 1000 );
				setTimeout(function() {
					$(".incorrectUser").fadeOut(1500);
				},3000);


			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}