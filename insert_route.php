<?php
	function writeJSON(){
		$file = $_POST['file'];
		$newData = [];
		$newData["name"] = $_POST['name'];
		$newData["route"] = $_POST['route'];
		$newData["key"] = $_POST['key'];

		//decodifica el json y lo pasamos a un array php
		$tempArray = json_decode(file_get_contents($file));

		//añadimos los nuevos datos al array
		array_push($tempArray, $newData);

		//convierte el array php con los nuevos datos a json
		$jsonData = json_encode($tempArray);

		//reemplaza los datos anteriores del archivo json con los nuevos datos
		file_put_contents($file, $jsonData);
	}
	switch ($_POST['action']) {
		case 'write':
			writeJSON();
			break;
		
		default:
			break;
	}
?>