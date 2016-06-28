function settingsUser(){
	var sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
	document.getElementById('currentName').innerHTML = sessionUser.user;
	document.getElementById('currentMail').innerHTML = sessionUser.mail;
	document.getElementById('currentDNI').innerHTML = sessionUser.dni;
}

function updateUser_php(){
	var sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
	var user = document.getElementById("newName").value;
	var mail = document.getElementById("newMail").value;
	var dni = document.getElementById("currentDNI").innerHTML;
	var password = document.getElementById("newPassword").value;
	var expMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var coins = sessionUser.coins;
	if (mail == "" && user == "" && password == ""){
		$(".invalidData").show( "blind", {direction: "up"}, 1000 );
		setTimeout(function() {
			$(".invalidData").fadeOut(1500);
		},3000);
	} else {
		if (mail === ""){mail = sessionUser.mail;}
		if (user === ""){user = sessionUser.user;}
		if (password === ""){password = sessionUser.password;}
	}
	if(user.length > 1 && expMail.test(mail) === true && password !== "" ){
		document.getElementById("updateForm").reset();
		$.ajax({
			type: "POST",
			url: "./insert.php",
			data: {"action":"update", "file": "./files/User.json", "user": user, "mail": mail, "dni": dni, "password": password},
			success: function(msg){
				$(".changesUser").show( "blind", {direction: "up"}, 1000 );
				setTimeout(function() {
					$(".changesUser").fadeOut(1500);
				},3000);
				document.getElementById('currentName').innerHTML = user;
				document.getElementById('currentMail').innerHTML = mail;
				var objectUser = {
					user: user,
					mail: mail,
					dni: dni,
					password: password,
					coins: coins
				}
				window.sessionStorage.setItem('user', JSON.stringify(objectUser));
				$("#userUnregistered").empty();
				$("#userUnregistered").append('<li><a id="abc" href="/user" class="register">' +
					'<span class="glyphicon glyphicon-user"></span>&nbsp' + 
					user +
					'</a></li>' +
					'<li><a href="/store"><span class="glyphicon glyphicon-piggy-bank"></span>' + "&nbsp&nbsp<span class='sessionCoins'>" + coins  +
					'</span><li><a href="/" id="closeSession" class="login"><span class="glyphicon glyphicon-log-in">' +
					'</span>&nbsp Cerrar Sesión</a></li>');

			},
			error: function(msg){
				console.log(msg);
			}
		});
	} else{
		$(".invalidData").show( "blind", {direction: "up"}, 1000 );
		setTimeout(function() {
			$(".invalidData").fadeOut(1500);
		},3000);	}
	}

	function deleteUser_php(){
		$(".inputDelete").css("display", "block");
		var sessionUser = JSON.parse(window.sessionStorage.getItem('user'));


		if($(".confirmDelete").val() === sessionUser.password){
			var dni = sessionUser.dni;
			$.ajax({
				type: "POST",
				url: "./insert.php",
				data: {"action":"delete", "file": "./files/User.json", "dni": dni},
				success: function(msg){
					window.sessionStorage.setItem('user', JSON.stringify(""));
					$(".outUser").show( "blind", {direction: "up"}, 1000 );
					setTimeout(function() {
						$(".outUser").fadeOut(1500);
					},3000);
					location.href = "/";
				},
				error: function(msg){
					console.log(msg);
				}
			});
		}
	}