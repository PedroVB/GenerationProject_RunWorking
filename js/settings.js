function settingsUser(){
	var sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
	document.getElementById('currentName').innerHTML = sessionUser.user;
	document.getElementById('currentMail').innerHTML = sessionUser.mail;
	document.getElementById('currentDNI').innerHTML = sessionUser.dni;
	document.getElementById('currentPassword').innerHTML = sessionUser.password;
}

function updateUser_php(){
	var user = document.getElementById("newName").value;
	var mail = document.getElementById("newMail").value;
	var dni = document.getElementById("currentDNI").innerHTML;
	var password = document.getElementById("newPassword").value;
	var expMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(user.length > 1 && expMail.test(mail) === true && password !== "" ){
		document.getElementById("updateForm").reset();
		$.ajax({
			type: "POST",
			url: "./insert.php",
			data: {"action":"update", "file": "./files/User.json", "user": user, "mail": mail, "dni": dni, "password": password},
			success: function(msg){
				alert("User Update");
				document.getElementById('currentName').innerHTML = user;
				document.getElementById('currentPassword').innerHTML = password;
				document.getElementById('currentMail').innerHTML = mail;
				var objectUser = {
					user: user,
					mail: mail,
					dni: dni,
					password: password
				}
				window.sessionStorage.setItem('user', JSON.stringify(objectUser));
				$("#userUnregistered").empty();
				$("#userUnregistered").append('<li><a id="abc" href="/user" class="register">' +
					'<span class="glyphicon glyphicon-user"></span>&nbsp' + 
					user +
					'</a></li>' +
					'<li><a href="/" id="closeSession" class="login"><span class="glyphicon glyphicon-log-in">' +
					'</span>&nbsp Cerrar Sesión</a></li>');

			},
			error: function(msg){
				console.log(msg);
			}
		});
	} else{
		alert("Los campos estan mal")
	}
}

function deleteUser_php(){
	var sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
	var dni = sessionUser.dni;
	$.ajax({
		type: "POST",
		url: "./insert.php",
		data: {"action":"delete", "file": "./files/User.json", "dni": dni},
		success: function(msg){
			alert("User Delete");
			location.href = "/";			},
			error: function(msg){
				console.log(msg);
			}
		});
}