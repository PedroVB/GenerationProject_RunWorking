<?php

switch ($_POST['action']) {
	case 'write': 
	writeJSON();
	break;
	
	case 'update':
	updateJSON();
	break;

	case 'delete':
	deleteJSON();
	break;

	default:
	break;
}

function writeJSON(){
	$file = $_POST['file'];
	$newData = [];
	$newData["user"] = $_POST['user'];
	$newData["mail"] = $_POST['mail'];
	$newData["dni"] = $_POST['dni'];
	$newData["password"] = $_POST['password'];
	$newData["coins"] = $_POST['coins'];


		//decodifica el json y lo pasamos a un array php
	$tempArray = json_decode(file_get_contents($file));

		//añadimos los nuevos datos al array
	array_push($tempArray, $newData);

		//convierte el array php con los nuevos datos a json
	$jsonData = json_encode($tempArray);

		//reemplaza los datos anteriores del archivo json con los nuevos datos
	file_put_contents($file, $jsonData);
}

function updateJSON(){
	$file = $_POST['file'];

	//decodifica el json y lo pasamos a un array php
	$tempArray = json_decode(file_get_contents($file));

	foreach ($tempArray as $user){
		if ($user->dni == $_POST["dni"]){
			//user es la posicion (el objeto entero) del array en la que estoy
			$user->user = $_POST["user"];
			$user->mail = $_POST["mail"];
			$user->password = $_POST["password"];
		}
	}

	$jsonData = json_encode($tempArray);

	//reemplaza los datos anteriores del archivo json con los nuevos datos
	file_put_contents($file, $jsonData);
}

function deleteJSON(){
	$file = $_POST['file'];

	//decodifica el json y lo pasamos a un array php
	$tempArray = json_decode(file_get_contents($file));

	for ($i = 0; $i < count($tempArray); $i++){
		if ($tempArray[$i]->dni == $_POST["dni"]){
			//user es la posicion (el objeto entero) del array en la que estoy
			unset($tempArray[$i]);
		}
	}

	$jsonData = json_encode($tempArray);

		//reemplaza los datos anteriores del archivo json con los nuevos datos
	file_put_contents($file, $jsonData);
}
?>