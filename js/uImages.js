function chargeImg(){
	var actualUser = JSON.parse(window.sessionStorage.getItem('user'));
	var arrayImages = [];
	var urlGalleryFile = './files/Gallery.json';

	/*app.controller('uImagesController', ['$scope', '$http', (function($scope, $http) {
		//$scope.imagesGalley = [];
		$http.get(urlGalleryFile)
		.then(function(res) {
			$scope.imagesGallery = res.data;
			// $("#imagesUser").append($scope.imagesGallery);
		});
})()]);*/

$.ajax({
	type: 'GET',
	url: './files/Gallery.json',
	crossDomain: true,
	jsonpCallback: 'jsonCallback',
	contentType: "application/json",
	dataType: 'json',
	success: function(response) {
		arrayImages = response;
		$("#myImgs").empty();
		for (var i = 0; i < arrayImages.length; i++){
			if (arrayImages[i].key == actualUser.dni){
				$("#myImgs").append('<img src="' + arrayImages[i].url + '" />');
			}
		}
	}
});
}