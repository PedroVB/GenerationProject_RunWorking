function call_php() {
	var user = document.getElementById("userRegister").value;
	var mail = document.getElementById("mail").value;
	var dni = document.getElementById("dni").value;
	var password = document.getElementById("passwordRegister").value;
	var expMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var expDni = /(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([A-Z]{1}))/;
	var initialCoins = 0;
	if(user.length > 1 && expMail.test(mail) === true && expDni.test(dni) === true && password !== "" ){
		document.getElementById("formRegister").reset();
		$.ajax({
			type: "POST",
			url: "./insert.php",
			data: {"action":"write", "file": "./files/User.json", "user": user, "mail": mail, "dni": dni, "password": password, "coins": initialCoins},
			success: function(msg){
				$(".incorrectUser").show( "blind", {direction: "up"}, 1000 );
				setTimeout(function() {
					$(".incorrectUser").fadeOut(1500);
				},3000);
				$("#userRegister").removeAttr("required");
				$("#userRegister").attr("style", "border: 2px solid red");
				$("head").append('<meta http-equiv="refresh" content="2;URL=/" />')
			},
			error: function(msg){
				console.log(msg);
			}
		});
	}
}

function recaptchaCallback() {
    $('#btnRegister').removeAttr('disabled');
};
